using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VerveChallenge.BusinessLogic
{
    public class BannersLogic
    {
        private readonly Data.ApplicationDbContext dbContext;
        private readonly IMapper mapper;

        public BannersLogic(Data.ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<List<Models.Banner>> GetAllBanners()
        {
            var banners = await dbContext.Banners.ToListAsync();
            return mapper.Map<List<Models.Banner>>(banners);
        }

        public async Task<Models.Banner> GetBanner(long bannerId)
        {
            var banner = await dbContext.Banners.Include(b => b.Campaigns).ThenInclude(b => b.Campaign).FirstOrDefaultAsync(b => b.Id == bannerId);
            if (banner == null)
                throw new ArgumentNullException();

            return mapper.Map<Models.Banner>(banner);
        }

        public async Task<Models.Banner> CreateBanner(Models.BannerCreate model)
        {
            var banner = (await dbContext.AddAsync(new Data.Banner { Name = model.Name })).Entity;
            await dbContext.SaveChangesAsync();

            return mapper.Map<Models.Banner>(banner);
        }

        public async Task<Models.Banner> UpdateBanner(long bannerId, Models.BannerUpdate model)
        {
            var banner = await dbContext.Banners.FirstOrDefaultAsync(b => b.Id == bannerId);
            if (banner == null)
                throw new ArgumentNullException();

            mapper.Map(model, banner);
            await dbContext.SaveChangesAsync();

            return mapper.Map<Models.Banner>(banner);
        }

        public async Task RemoveCampaignFromBanner(long bannerId, long campaignId)
        {
            var bannerCampaign = await dbContext.CampaignBanners.FirstOrDefaultAsync(b => b.BannerId == bannerId && b.CampaignId == campaignId);
            if (bannerCampaign != null)
            {
                var banner = await dbContext.Banners.FirstOrDefaultAsync(b => b.Id == bannerId);
                if (banner == null)
                    throw new ArgumentNullException();

                var campaign = await dbContext.Campaigns.FirstOrDefaultAsync(b => b.Id == campaignId);
                if (campaign == null)
                    throw new ArgumentNullException();

                dbContext.Remove(bannerCampaign);
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task AddCampaignToBanner(long bannerId, long campaignId)
        {
            var bannerCampaign = await dbContext.CampaignBanners.FirstOrDefaultAsync(b => b.BannerId == bannerId && b.CampaignId == campaignId);
            if (bannerCampaign == null)
            {
                var banner = await dbContext.Banners.FirstOrDefaultAsync(b => b.Id == bannerId);
                if (banner == null)
                    throw new ArgumentNullException();

                var campaign = await dbContext.Campaigns.FirstOrDefaultAsync(b => b.Id == campaignId);
                if (campaign == null)
                    throw new ArgumentNullException();

                await dbContext.AddAsync(new Data.BannerCampaign { Banner = banner, Campaign = campaign });
                await dbContext.SaveChangesAsync();
            }
        }

        public async Task DeleteBanner(long bannerId)
        {
            var banner = await dbContext.Banners.FirstOrDefaultAsync(b => b.Id == bannerId);
            if (banner == null)
                throw new ArgumentNullException();

            dbContext.Remove(banner);
            await dbContext.SaveChangesAsync();
        }
    }
}
