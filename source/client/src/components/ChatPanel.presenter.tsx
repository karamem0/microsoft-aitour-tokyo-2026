//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

/* eslint-disable sonarjs/no-nested-functions */

import { css } from '@emotion/react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import {  ActivityMiddleware } from 'botframework-webchat-api';
import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import { EventHandler } from '../types/Event';
import { ToDoItem, ToDoItemDTO } from '../types/Store';
import { parse } from '../utils/Date';

const directLine = createDirectLine({
  token: import.meta.env.VITE_DIRECT_LINE_TOKEN
});

interface Activity {
  from: {
    role: 'bot' | 'channel' | 'user'
  },
  name: string,
  text?: string,
  type?: string
};

interface ChatPanelProps {
  onAppendToDoItem: EventHandler<ToDoItem>
}

function ChatPanel(props: Readonly<ChatPanelProps>) {

  const { onAppendToDoItem } = props;

  const { theme } = useTheme();

  const activityMiddleware = React.useCallback<ActivityMiddleware>(() => (next) => (...setupArgs) => {
    const [ options ] = setupArgs;
    const activity = options.activity as Activity;
    const {
      from,
      name,
      text,
      type
    } = activity;
    if (
      from.role === 'bot' &&
      type === 'event' &&
      name === 'items' &&
      text != null
    ) {
      const json = JSON.parse(text);
      const value = json.value as ToDoItemDTO[];
      value.forEach((item) => onAppendToDoItem(
        {},
        {
          due: parse(item.due),
          id: item.id,
          name: item.name
        }));
    }
    return next(options);
  }, [
    onAppendToDoItem
  ]);

  return (
    <div
      css={css`
        min-width: 20rem;
        max-height: calc(100svh - 3rem);
        padding: 1rem;
        overflow-y: hidden;
        background-color: ${theme.colorNeutralBackground1};
        border-left: 1px solid ${theme.colorNeutralStroke1};
      `}>
      <ReactWebChat
        activityMiddleware={activityMiddleware}
        directLine={directLine}
        locale="ja"
        styleOptions={{
          hideUploadButton: true,
          sendBoxButtonShadeBorderRadius: 8
        }} />
    </div>
  );

}

export default React.memo(ChatPanel);
