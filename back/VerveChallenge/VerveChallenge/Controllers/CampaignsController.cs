using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VerveChallenge.BusinessLogic;

namespace VerveChallenge.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignsController : ControllerBase
    {
        private readonly CampaignsLogic campaignsLogic;

        public CampaignsController(CampaignsLogic campaignsLogic)
        {
            this.campaignsLogic = campaignsLogic;
        }

        [HttpGet]
        [Route("{campaignId}")]
        public async Task<Models.Campaign> Get(long campaignId)
        {
            return await campaignsLogic.GetCampaign(campaignId);
        }

        [HttpGet]
        public async Task<List<Models.Campaign>> Get()
        {
            return await campaignsLogic.GetAllCampaigns();
        }

        [HttpPost]
        public async Task<Models.Campaign> Post(Models.CampaignCreate model)
        {
            return await campaignsLogic.CreateCampaign(model);
        }

        [HttpPut]
        [Route("{campaignId}")]
        public async Task<Models.Campaign> Put(long campaignId, Models.CampaignUpdate model)
        {
            return await campaignsLogic.UpdateCampaign(campaignId, model);
        }

        [HttpPost]
        [Route("{campaignId}/banner/{bannerId}")]
        public async Task AddCampaignToBanner(long campaignId, long bannerId)
        {
            await campaignsLogic.AddCampaignToBanner(campaignId, bannerId);
        }

        [HttpDelete]
        [Route("{campaignId}/banner/{bannerId}")]
        public async Task RemoveBannerFromCampaign(long campaignId, long bannerId)
        {
            await campaignsLogic.RemoveBannerFromCampaign(campaignId, bannerId);
        }

        [HttpDelete]
        [Route("{campaignId}")]
        public async Task Delete(long campaignId)
        {
            await campaignsLogic.DeleteCampaign(campaignId);
        }
    }
}
