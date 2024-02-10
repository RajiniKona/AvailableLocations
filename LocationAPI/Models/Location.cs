using System.ComponentModel.DataAnnotations;

namespace AvailableLocations.Models
{
    public class Location
    {
        [Key]
        public int Id { get; set; }

        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string? LocationName { get; set; }
    }
}
