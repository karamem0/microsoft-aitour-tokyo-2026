//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

export interface Action {
  payload: unknown,
  type: ActionType
}

export type ActionType =
  | 'appendItem'
  | 'removeItem';

export interface State {
  items?: ToDoItem[]
}

export interface ToDoItem {
  due?: Date,
  id?: string,
  name?: string
}

export interface ToDoItemDTO {
  due?: string,
  id?: string,
  name?: string
}
