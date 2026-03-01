//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using Karamem0.MyToDoList;
using Karamem0.MyToDoList.Services;
using Microsoft.Agents.Builder.State;
using Microsoft.Agents.Hosting.AspNetCore;
using Microsoft.Agents.Storage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

_ = builder.AddAgent<ToDoAgent>();
_ = builder.AddAgentApplicationOptions();

var services = builder.Services;
_ = services.AddHttpClient();
_ = services.AddHttpClient(
    "MicrosoftGraph",
    client =>
    {
        client.BaseAddress = new Uri("https://graph.microsoft.com");
        client.DefaultRequestHeaders.Add("Accept", "application/json");
    }
);
_ = services.AddApplicationInsightsTelemetry();
_ = services.AddSingleton<IStorage, MemoryStorage>();
_ = services.AddSingleton<ConversationState>();
_ = services.AddSingleton<ICopilotServiceFactory, CopilotServiceFactory>();
_ = services.AddAgentAspNetAuthentication(builder.Configuration);
_ = services.AddAuthorization();

var app = builder.Build();
_ = app.UseHttpsRedirection();
_ = app.UseHsts();
_ = app.UseStaticFiles();
_ = app.MapFallbackToFile("/index.html");
_ = app.MapAgentApplicationEndpoints();

await app.RunAsync();
