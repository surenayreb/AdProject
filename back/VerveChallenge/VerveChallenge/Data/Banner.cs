using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VerveChallenge.Data
{
    public class Banner
    {
        [Key]
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Text { get; set; }
        public HashSet<BannerCampaign> Campaigns { get; set; }
    }
}
