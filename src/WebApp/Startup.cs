﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using WebApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using WebApp.ViewModels;
using System.IO;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.AspNetCore.SignalR.Hubs;
using WebApp.Hubs;
using Newtonsoft.Json;

namespace WebApp
{
    public class Startup
    {
        private IHostingEnvironment _env;
        private IConfigurationRoot _config;

        public Startup(IHostingEnvironment env)
        {
            _env = env;

            var builder = new ConfigurationBuilder()
                .SetBasePath(_env.ContentRootPath)
                .AddJsonFile("appConfig.json")
                .AddEnvironmentVariables();

            _config = builder.Build();
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();

            var settings = new JsonSerializerSettings();                                //SignalR .NET Core camelCase JSON Contract Resolver

            settings.ContractResolver = new SignalRContractResolver();

            var serializer = JsonSerializer.Create(settings);

            services.Add(new ServiceDescriptor(typeof(JsonSerializer),
                                               provider => serializer,
                                               ServiceLifetime.Transient));


            services.AddSingleton(_config); //da bi injektirali u AppController()

            services.AddIdentity<WebAppUser, IdentityRole>(config =>
            {
                config.Password.RequiredLength = 8;
                config.Password.RequireNonAlphanumeric = false;
                config.User.RequireUniqueEmail = true;
                config.Cookies.ApplicationCookie.LoginPath = "/Auth/Login";                 //TODO Change to sth like "/Auth/Login"
                config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = async ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                        {
                            ctx.Response.StatusCode = 401;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        await Task.Yield();
                    }
                };
            }).AddEntityFrameworkStores<WebAppContext>();

            services.AddDbContext<WebAppContext>();
            services.AddScoped<IWebAppRepository, WebAppRepository>();
            services.AddTransient<WebAppSeedData>();

            services.AddMvc(config =>
            {
                if (_env.IsProduction())
                {
                    config.Filters.Add(new RequireHttpsAttribute());
                }
            });

            //services.AddSingleton<IAssemblyLocator, CurrentAssemblyLocator>();

            services.AddSignalR(options => options.Hubs.EnableDetailedErrors = true);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, WebAppSeedData seeder)
        {
            //app.UseCors();
            Mapper.Initialize(config =>
            {
                config.CreateMap<PollsViewModel, Poll>().ReverseMap();
            });

            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            /*app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404                                  //uz ovaj dio koda, ako otidjemo na 'trash' URL, baca nas na index.html u wwwroot
                    && !Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });*/

            //app.UseStaticFiles();

            app.UseCors(
                builder => builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials())
                .UseStaticFiles()
                .UseWebSockets();

            app.UseIdentity();

            app.UseMvc(config =>
            {
                config.MapRoute(
                    name: "Default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" }
                    );

                //config.MapSpaFallbackRoute("spa-fallback", new { controller = "Home", action = "Index" });
            });

            app.UseSignalR();

            seeder.EnsureSeedData().Wait();
        }
    }
}
