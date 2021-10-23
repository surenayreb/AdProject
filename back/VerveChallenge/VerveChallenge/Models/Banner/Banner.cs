using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VerveChallenge.Models
{
    public class Banner
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Text { get; set; }

        public List<CampaignItem> Campaigns { get; set; }
    }
}
