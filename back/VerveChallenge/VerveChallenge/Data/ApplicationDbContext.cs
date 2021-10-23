using Microsoft.EntityFrameworkCore;

namespace VerveChallenge.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Banner> Banners { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<BannerCampaign> CampaignBanners { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BannerCampaign>()
                .HasKey(pu => new { pu.BannerId, pu.CampaignId });
            
            builder.Entity<BannerCampaign>()
                .HasOne(bc => bc.Banner)
                .WithMany(b => b.Campaigns)
                .HasForeignKey(bc => bc.BannerId);

            builder.Entity<BannerCampaign>()
                .HasOne(bc => bc.Campaign)
                .WithMany(c => c.Banners)
                .HasForeignKey(bc => bc.CampaignId);
        }
    }
}