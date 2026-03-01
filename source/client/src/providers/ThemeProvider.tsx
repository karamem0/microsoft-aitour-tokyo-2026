//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

import {
  FluentProvider,
  Theme,
  webLightTheme
} from '@fluentui/react-components';

interface ThemeContextState {
  theme: Theme
}

const ThemeContext = React.createContext<ThemeContextState | undefined>(undefined);

export const useTheme = (): ThemeContextState => {
  const value = React.useContext(ThemeContext);
  if (value == null) {
    throw new Error('The context is not initialzed: ThemeContext');
  }
  return value;
};

function ThemeProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const value = React.useMemo<ThemeContextState>(() => ({
    theme: webLightTheme
  }), []);

  return (
    <ThemeContext.Provider value={value}>
      <FluentProvider theme={value.theme}>
        {children}
      </FluentProvider>
    </ThemeContext.Provider>
  );

}

export default ThemeProvider;

