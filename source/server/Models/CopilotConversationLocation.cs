//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

using System.Text.Json.Serialization;

namespace Karamem0.MyToDoList.Models;

public record CopilotConversationLocation
{

    [JsonPropertyName("countryOrRegion")]
    public string? CountryOrRegion { get; set; }

    [JsonPropertyName("countryOrRegionConfidence")]
    public long? CountryOrRegionConfidence { get; set; }

    [JsonPropertyName("latitude")]
    public long? Latitude { get; set; }

    [JsonPropertyName("longitude")]
    public long? Longitude { get; set; }

    [JsonPropertyName("timeZone")]
    public string? TimeZone { get; set; }

}
