using AvailableLocations.Models;
using LocationAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AvailableLocations.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {
            base.ConfigureConventions(builder);
            builder.Properties<TimeOnly>()
        .HaveConversion<TimeOnlyConverter, TimeOnlyComparer>();
        }
        public DbSet<Location> Locations { get; set; }
    }
}
