namespace VerveChallenge.Data
{
    public class BannerCampaign
    {
        public long CampaignId { get; set; }
        public long BannerId { get; set; }

        public Campaign Campaign { get; set; }
        public Banner Banner { get; set; }
    }
}
