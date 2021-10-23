using System.Collections.Generic;

namespace VerveChallenge.Models
{
    public class CampaignUpdate
    {
        public string Name { get; set; }
        public List<int> ActiveHours { get; set; }

        public string ActiveHoursString
        {
            get
            {
                return string.Join(",", ActiveHours);
            }
        }
    }
}
