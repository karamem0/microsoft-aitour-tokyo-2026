//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

import Presenter from './ChatPanel.presenter';

import { useStore } from '../providers/StoreProvider';
import { Event } from '../types/Event';
import { ToDoItem } from '../types/Store';

function ChatPanel() {

  const { dispatch } = useStore();

  const handleAppendToDoItem = React.useCallback((_: Event, data?: ToDoItem) => {
    if (data == null) {
      throw new Error('The data is required.');
    }
    dispatch({
      payload: data,
      type: 'appendItem' as const
    });
  }, [
    dispatch
  ]);

  return (
    <Presenter onAppendToDoItem={handleAppendToDoItem} />
  );

}

export default ChatPanel;
