//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

import { css } from '@emotion/react';
import { Spinner, Text } from '@fluentui/react-components';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';
import ChatPanel from '../components/ChatPanel';
import ListPanel from '../components/ListPanel';
import { useTheme } from '../providers/ThemeProvider';

interface MainPageProps {
  loading?: boolean
}

function MainPage(props: Readonly<MainPageProps>) {

  const { loading } = props;

  const { theme } = useTheme();

  return (
    <React.Fragment>
      <title>MyToDo</title>
      <FluentThemeProvider>
        {
          loading ? (
            <div
              css={css`
                display: grid;
                min-height: 100svh;
                padding: 1rem;
            `}>
              <Spinner />
            </div>
          ) : (
            <div
              css={css`
                display: grid;
                grid-template-rows: 3rem auto;
                grid-template-columns: 1fr;
                min-height: 100svh;
            `}>
              <div
                css={css`
                  display: grid;
                  align-items: center;
                  justify-content: start;
                  padding: 0 1rem;
                  color: ${theme.colorNeutralForegroundInverted};
                  background-color: ${theme.colorBrandBackground};
                `}>
                <Text
                  as="h1"
                  css={css`
                    font-size: ${theme.fontSizeBase500};
                    font-weight: ${theme.fontWeightSemibold};
                    line-height: calc(${theme.fontSizeBase500} * 1.25);
                  `}>
                  MyToDo
                </Text>
              </div>
              <div
                css={css`
                  display: grid;
                  grid-template-rows: 1fr;
                  grid-template-columns: 4fr 1fr;
                `}>
                <ListPanel />
                <ChatPanel />
              </div>
            </div>
          )
        }
      </FluentThemeProvider>
    </React.Fragment>
  );

}

export default React.memo(MainPage);
