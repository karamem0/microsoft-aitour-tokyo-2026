//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using System.Text.Json.Serialization;

namespace Karamem0.MyToDoList.Models;

public record CopilotConversation
{

    [JsonPropertyName("id")]
    public required string Id { get; set; }

    [JsonPropertyName("createdDateTime")]
    public DateTimeOffset? CreatedDateTime { get; set; }

    [JsonPropertyName("displayName")]
    public string? DisplayName { get; set; }

    [JsonPropertyName("messages")]
    public IReadOnlyCollection<CopilotConversationResponseMessage>? Messages { get; set; }

    [JsonPropertyName("turnCount")]
    public int? TurnCount { get; set; }

}
