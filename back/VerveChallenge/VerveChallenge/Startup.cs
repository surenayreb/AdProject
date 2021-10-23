using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using VerveChallenge.BusinessLogic;

namespace VerveChallenge
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                var allowedOriginsStr = Configuration["AllowedOrigins"];
                var allowedOrigins = allowedOriginsStr.Split(',');
                options.AddPolicy("DefaultPolicy",
                    builder =>
                    {
                        builder
                        .WithOrigins(allowedOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                    });
            });

            services.AddAutoMapper(typeof(Startup));

            var connectionString = Configuration["Connections:ConnectionString"];
            services.AddDbContext<Data.ApplicationDbContext>(options => options.UseSqlite(connectionString));
            services.AddControllers();

            //Registering Services
            services.AddScoped<BannersLogic>();
            services.AddScoped<CampaignsLogic>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("DefaultPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireCors("DefaultPolicy");
            });
        }
    }
}
