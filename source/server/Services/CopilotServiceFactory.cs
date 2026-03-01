//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using System.Net.Http;

namespace Karamem0.MyToDoList.Services;

public interface ICopilotServiceFactory
{

    ICopilotService Create(string accessToken);

}

public class CopilotServiceFactory(IHttpClientFactory httpClientFactory) : ICopilotServiceFactory
{

    private readonly IHttpClientFactory httpClientFactory = httpClientFactory;

    public ICopilotService Create(string accessToken)
    {
        return new CopilotService(accessToken, this.httpClientFactory);
    }

}
