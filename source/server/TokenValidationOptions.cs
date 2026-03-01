//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

namespace Karamem0.MyToDoList;

public record TokenValidationOptions
{

    public required string[] Audiences { get; set; }

    public required string TenantId { get; set; }

}
