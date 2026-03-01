//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import { BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    authority: import.meta.env.VITE_MICROSOFT_AUTHORITY,
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID_APP,
    redirectUri: `${window.location.origin}`
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: false
  }
};

export const loginParams = {
  scopes: [
    `${import.meta.env.VITE_MICROSOFT_CLIENT_ID_BOT}/user_impersonation`
  ]
};
