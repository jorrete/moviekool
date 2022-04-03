/* eslint-disable no-case-declarations */
import { MovieListItemInterface } from 'hooks/useTMDB/useTMDB';

interface StateInterface {
  list: MovieListItemInterface[],
  focused: number,
  offset: number,
  cardWidth: number,
  cardPadding: number,
  deltaX: number,
}

interface ActionInterface {
  type: string,
  [key: string]: unknown,
}

const DEFAULT_STATE: StateInterface = {
  list: [],
  focused: 0,
  offset: 0,
  cardWidth: 0,
  cardPadding: 0,
  deltaX: 0,
};

// update everything
const ACTION_UPDATE = 'update';

function update(state: object) {
  return {
    type: ACTION_UPDATE,
    ...state,
  };
}

// wich movie is focused
const ACTION_FOCUS = 'focus';

function focus(focused: number) {
  return {
    type: ACTION_FOCUS,
    focused,
  };
}

function prepareFocus(focused: number, state: StateInterface) {
  const maxIndex = state.list.length - 1;

  // prevent not to execeed list limits
  const safeFocused = (
    focused < 0
      ? 0
      : focused > maxIndex
        ? maxIndex
        : focused
  );

  return {
    focused: safeFocused,
    deltaX: (state.cardWidth + state.cardPadding * 2) * safeFocused,
  };
}

function reducer(state: StateInterface, action: ActionInterface): StateInterface {
  switch (action.type) {
    case ACTION_UPDATE:
      return {
        ...state,
        ...action,
      };

    case ACTION_FOCUS:
      return {
        ...state,
        ...prepareFocus(action.focused as number, state),
      };
  }

  return state;
}

export {
  reducer,
  DEFAULT_STATE,
  update,
  focus,
};
