using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VerveChallenge.Data
{
    public class Campaign
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public HashSet<BannerCampaign> Banners { get; set; }

        public string ActiveHoursString { get; set; }
    }
}
