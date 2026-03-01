//
// Copyright (c) 2026 karamem0
//
// This software is released under the MIT License.
//
// https://github.com/karamem0/microsoft-aitour-tokyo-2026/blob/main/LICENSE
//

import React from 'react';

import { reducer } from '../stores/Reducer';
import { Action, State } from '../types/Store';

const initialState: State = {
  items: []
};

interface StoreContextState {
  dispatch: React.Dispatch<Action>,
  state: State
}

const StoreContext = React.createContext<StoreContextState | undefined>(undefined);

export const useStore = (): StoreContextState => {
  const value = React.useContext(StoreContext);
  if (value == null) {
    throw new Error('The context is not initialzed: StoreContext');
  }
  return value;
};

function StoreProvider(props: Readonly<React.PropsWithChildren<unknown>>) {

  const { children } = props;

  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const value = React.useMemo<StoreContextState>(() => ({
    dispatch,
    state
  }), [
    state,
    dispatch
  ]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );

}

export default StoreProvider;
