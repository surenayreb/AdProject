using System.Collections.Generic;
using System.Linq;

namespace VerveChallenge.Models
{
    public class Campaign
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<BannerItem> Banners { get; set; }
        public string ActiveHoursString { get; set; }

        public List<string> ActiveHours
        {
            get
            {
                return ActiveHoursString.Split(",").ToList();
            }
        }
    }
}
