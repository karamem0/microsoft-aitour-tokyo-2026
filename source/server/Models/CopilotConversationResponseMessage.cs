//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using System.Text.Json.Serialization;

namespace Karamem0.MyToDoList.Models;

public record CopilotConversationResponseMessage
{

    [JsonPropertyName("createdDateTime")]
    public DateTimeOffset? CreatedDateTime { get; set; }

    [JsonPropertyName("id")]
    public required string Id { get; set; }

    [JsonPropertyName("text")]
    public string? Text { get; set; }

}
