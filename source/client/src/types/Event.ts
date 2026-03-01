//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

export type Event =
  | globalThis.Event
  | React.SyntheticEvent
  | Record<string, never>;

export type EventHandler<T = never> = (
  event: Event,
  data?: T
) => void;
