//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Global } from '@emotion/react';
import { createIntl, IntlProvider } from 'react-intl';
import * as ress from 'ress';
import MainPage from './pages/MainPage';
import MsalProvider from './providers/MsalProvider';
import StoreProvider from './providers/StoreProvider';
import ThemeProvider from './providers/ThemeProvider';

const intl = createIntl({
  defaultLocale: 'ja',
  locale: 'ja'
});

ReactDOM
  .createRoot(document.getElementById('root') as Element)
  .render(
    <React.Fragment>
      <Global styles={ress} />
      <IntlProvider {...intl}>
        <ThemeProvider>
          <MsalProvider>
            <StoreProvider>
              <MainPage />
            </StoreProvider>
          </MsalProvider>
        </ThemeProvider>
      </IntlProvider>
    </React.Fragment>
  );
