//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import { Action, State, ToDoItem } from '../types/Store';

const actions = {
  appendItem: (state: State, payload: unknown): State => {
    const data = payload as ToDoItem | undefined;
    if (data == null) {
      return state;
    }
    if (state.items?.find((item) => item.id === data.id) == null) {
      return {
        ...state,
        items: [
          ...(state.items ?? []),
          data
        ]
      };
    } else {
      return {
        ...state,
        items: state.items?.map((item) => item.id === data.id ? data : item)
      };
    }
  },
  removeItem: (state: State, payload: unknown): State => {
    const data = payload as ToDoItem | undefined;
    if (data == null) {
      return state;
    }
    return {
      ...state,
      items: state.items?.filter((item) => item.id !== data.id)
    };
  }
};

export const reducer = (state: State, action: Action): State => actions[action.type]?.(state, action.payload) ?? state;
