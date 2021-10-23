using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace VerveChallenge.BusinessLogic
{
    public class CampaignsLogic
    {
        private const int hoursInDay = 24;
        private readonly Data.ApplicationDbContext dbContext;
        private readonly IMapper mapper;

        public CampaignsLogic(Data.ApplicationDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<List<Models.Campaign>> GetAllCampaigns()
        {
            var campaigns = await dbContext.Campaigns.ToListAsync();
            return mapper.Map<List<Models.Campaign>>(campaigns);
        }

        public async Task<Models.Campaign> GetCampaign(long campaignId)
        {
            var campaign = await dbContext.Campaigns.Include(c => c.Banners).ThenInclude(b => b.Banner).FirstOrDefaultAsync(b => b.Id == campaignId);
            if (campaign == null)
                throw new ArgumentNullException();

            return mapper.Map<Models.Campaign>(campaign);
        }

        public async Task<Models.Campaign> CreateCampaign(Models.CampaignCreate model)
        {
            var campaign = (await dbContext.AddAsync(new Data.Campaign { Name = model.Name })).Entity;
            campaign.ActiveHoursString = String.Join(",", new List<int>(GetHoursInDay()));
            await dbContext.SaveChangesAsync();

            return mapper.Map<Models.Campaign>(campaign);
        }

        private List<int> GetHoursInDay()
        {
            var hours = new List<int>();
            for (int i = 0; i < hoursInDay; i++)
            {
                hours.Add(i);
            }
            return hours;
        }

        public async Task<Models.Campaign> UpdateCampaign(long campaignId, Models.CampaignUpdate model)
        {
            var campaign = await dbContext.Campaigns.FirstOrDefaultAsync(b => b.Id == campaignId);
            if (campaign == null)
                throw new ArgumentNullException();

            mapper.Map(model, campaign);
            await dbContext.SaveChangesAsync();

            return mapper.Map<Models.Campaign>(campaign);
        }

        public async Task AddCampaignToBanner(long campaignId, long bannerId)
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

        public async Task RemoveBannerFromCampaign(long campaignId, long bannerId)
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

        public async Task DeleteCampaign(long campaignId)
        {
            var campaign = await dbContext.Campaigns.FirstOrDefaultAsync(b => b.Id == campaignId);
            if (campaign == null)
                throw new ArgumentNullException();

            dbContext.Remove(campaign);
            await dbContext.SaveChangesAsync();
        }
    }
}
