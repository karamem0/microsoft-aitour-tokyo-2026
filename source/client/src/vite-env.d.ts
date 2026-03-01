//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

/// <reference types="vite/client" />

declare module 'ress';

interface ImportMetaEnv {
  readonly VITE_MICROSOFT_AUTHORITY: string,
  readonly VITE_MICROSOFT_CLIENT_APP_ID: string,
  readonly VITE_MICROSOFT_SERVER_APP_ID: string,
  readonly VITE_TELEMETRY_CONNECTION_STRING: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
