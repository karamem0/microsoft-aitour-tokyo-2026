//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using Karamem0.MyToDoList.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;

namespace Karamem0.MyToDoList.Services;

public interface ICopilotService
{

    Task<CopilotConversation> CreateConversationAsync(CancellationToken cancellationToken = default);

    Task<CopilotConversation> ChatCompletionAsync(
        string conversationId,
        CopilotConversationRequest conversationRequest,
        CancellationToken cancellationToken = default
    );

}

public class CopilotService(string accessToken, IHttpClientFactory httpClientFactory) : ICopilotService
{

    private static readonly JsonSerializerOptions jsonSerializerOptions = new()
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
        PropertyNameCaseInsensitive = true
    };

    private readonly string accessToken = accessToken;

    private readonly HttpClient httpClient = httpClientFactory.CreateClient("MicrosoftGraph");

    public async Task<CopilotConversation> CreateConversationAsync(CancellationToken cancellationToken = default)
    {
        var httpRequest = new HttpRequestMessage(HttpMethod.Post, "/beta/copilot/conversations")
        {
            Content = JsonContent.Create(
                new
                {
                },
                options: jsonSerializerOptions
            )
        };
        httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", this.accessToken);
        var httpResponse = await this.httpClient.SendAsync(httpRequest, cancellationToken);
        if (httpResponse.IsSuccessStatusCode)
        {
            var conversation = await httpResponse.Content.ReadFromJsonAsync<CopilotConversation>(jsonSerializerOptions, cancellationToken);
            if (conversation is null)
            {
                throw new InvalidOperationException("会話の作成に失敗しました。");
            }
            else
            {
                return conversation;
            }
        }
        else
        {
            var statusCode = httpResponse.StatusCode;
            var errorMessage = await httpResponse.Content.ReadAsStringAsync(cancellationToken);
            throw new InvalidOperationException($"会話の作成に失敗しました: {statusCode}, {errorMessage}");
        }
    }

    public async Task<CopilotConversation> ChatCompletionAsync(
        string conversationId,
        CopilotConversationRequest conversationRequest,
        CancellationToken cancellationToken = default
    )
    {
        var httpRequest = new HttpRequestMessage(HttpMethod.Post, $"/beta/copilot/conversations/{conversationId}/chat")
        {
            Content = JsonContent.Create(conversationRequest, options: jsonSerializerOptions)
        };
        httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", this.accessToken);
        var httpResponse = await this.httpClient.SendAsync(httpRequest, cancellationToken);
        if (httpResponse.IsSuccessStatusCode)
        {
            var conversation = await httpResponse.Content.ReadFromJsonAsync<CopilotConversation>(jsonSerializerOptions, cancellationToken);
            if (conversation is null)
            {
                throw new InvalidOperationException("会話の作成に失敗しました。");
            }
            else
            {
                return conversation;
            }
        }
        else
        {
            var statusCode = httpResponse.StatusCode;
            var errorMessage = await httpResponse.Content.ReadAsStringAsync(cancellationToken);
            throw new InvalidOperationException($"会話の作成に失敗しました: {statusCode}, {errorMessage}");
        }
    }

}
