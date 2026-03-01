//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

import Presenter from './ListPanel.presenter';

import { v4 as uuid } from 'uuid';
import { useStore } from '../providers/StoreProvider';
import { Event } from '../types/Event';
import { ToDoItem } from '../types/Store';

function ListPanel() {

  const {
    dispatch,
    state
  } = useStore();

  const handleAppendItem = React.useCallback((_: Event, data?: ToDoItem) => {
    if (data == null) {
      throw new Error('The data is required.');
    }
    dispatch({
      payload: {
        ...data,
        id: uuid()
      },
      type: 'appendItem' as const
    });
  }, [
    dispatch
  ]);

  const handleRemoveItem = React.useCallback((_: Event, data?: ToDoItem) => {
    if (data == null) {
      throw new Error('The data is required.');
    }
    dispatch({
      payload: data,
      type: 'removeItem' as const
    });
  }, [
    dispatch
  ]);

  return (
    <Presenter
      items={state.items}
      onAppendItem={handleAppendItem}
      onRemoveItem={handleRemoveItem} />
  );

}

export default ListPanel;
