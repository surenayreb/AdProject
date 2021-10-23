using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VerveChallenge.BusinessLogic;

namespace VerveChallenge.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BannersController : ControllerBase
    {
        private readonly BannersLogic bannersLogic;

        public BannersController(BannersLogic bannersLogic)
        {
            this.bannersLogic = bannersLogic;
        }

        [HttpGet]
        [Route("{bannerId}")]
        public async Task<Models.Banner> Get(long bannerId)
        {
            return await bannersLogic.GetBanner(bannerId);
        }

        [HttpGet]
        public async Task<List<Models.Banner>> Get()
        {
            return await bannersLogic.GetAllBanners();
        }

        [HttpPost]
        public async Task<Models.Banner> Post(Models.BannerCreate model)
        {
            return await bannersLogic.CreateBanner(model);
        }

        [HttpPut]
        [Route("{bannerId}")]
        public async Task<Models.Banner> Put(long bannerId, Models.BannerUpdate model)
        {
            return await bannersLogic.UpdateBanner(bannerId, model);
        }

        [HttpPost]
        [Route("{bannerId}/campaign/{campaignId}")]
        public async Task AddCampaignToBanner(long bannerId, long campaignId)
        {
            await bannersLogic.AddCampaignToBanner(bannerId, campaignId);
        }

        [HttpDelete]
        [Route("{bannerId}/campaign/{campaignId}")]
        public async Task RemoveCampaignFromBanner(long bannerId, long campaignId)
        {
            await bannersLogic.RemoveCampaignFromBanner(bannerId, campaignId);
        }

        [HttpDelete]
        [Route("{bannerId}")]
        public async Task Delete(long bannerId)
        {
            await bannersLogic.DeleteBanner(bannerId);
        }
    }
}
