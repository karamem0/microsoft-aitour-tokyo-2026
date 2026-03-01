//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

export function parse(value: string | null | undefined): Date | undefined {
  if (value == null) {
    return undefined;
  }
  if (value === '') {
    return undefined;
  }
  return new Date(value);
}

export function today(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}
