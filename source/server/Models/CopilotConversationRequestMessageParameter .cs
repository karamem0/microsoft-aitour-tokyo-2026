//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using System.Text.Json.Serialization;

namespace Karamem0.MyToDoList.Models;

public record CopilotConversationRequestMessageParameter
{

    [JsonPropertyName("text")]
    public required string Text { get; set; }

}
