//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace Karamem0.MyToDoList;

public static class ConfigureServices
{

    public static IServiceCollection AddAgentAspNetAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var options = configuration
            .GetSection("TokenValidation")
            .Get<TokenValidationOptions>();
        _ = options ?? throw new InvalidOperationException();
        _ = services
            .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }
            )
            .AddJwtBearer(jwtBearerOptions =>
                {
                    jwtBearerOptions.SaveToken = true;
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.FromMinutes(5),
                        RequireSignedTokens = true,
                        SignatureValidator = (token, parameters) => new JsonWebToken(token),
                        ValidIssuers =
                        [
                            "https://api.botframework.com",
                            "https://sts.windows.net/d6d49420-f39b-4df7-a1dc-d59a935871db/",
                            "https://login.microsoftonline.com/d6d49420-f39b-4df7-a1dc-d59a935871db/v2.0",
                            "https://sts.windows.net/f8cdef31-a31e-4b4a-93e4-5f571e91255a/",
                            "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a/v2.0",
                            $"https://sts.windows.net/{options.TenantId}/",
                            $"https://login.microsoftonline.com/{options.TenantId}/v2.0",
                        ],
                        ValidAudiences = options.Audiences ?? [],
                    };
                }
            );
        return services;
    }

}
