using AutoMapper;
using System.Linq;

namespace VerveChallenge
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            CreateMap<Data.Banner, Models.Banner>()
                .ForMember(dest => dest.Campaigns, map => map.MapFrom(src => src.Campaigns.Select(c=>c.Campaign)));
            CreateMap<Data.Banner, Models.BannerItem>();
            CreateMap<Models.BannerCreate, Data.Banner>();
            CreateMap<Models.BannerUpdate, Data.Banner>();

            CreateMap<Data.Campaign, Models.Campaign>()
                .ForMember(dest => dest.Banners, map => map.MapFrom(src => src.Banners.Select(c => c.Banner)));             
            CreateMap<Data.Campaign, Models.CampaignItem>();
            CreateMap<Models.CampaignCreate, Data.Campaign>();
            CreateMap<Models.CampaignUpdate, Data.Campaign>();
        }
    }
}