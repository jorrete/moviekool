import { useReducer, useEffect, useRef, useCallback } from 'react';

interface State {
  hover: boolean,
  active: boolean,
}

const DEFAULT_STATE: State = {
  hover: false,
  active: false,
};

const ACTION_HOVER_ON = 'hoveron';
const ACTION_HOVER_OFF = 'hoveroff';
const ACTION_ACTIVE_ON = 'activeon';
const ACTION_ACTIVE_OFF = 'activeoff';
const ACTION_ELEMENT = 'element';

function reducer(state: State, action: string) {
  switch (action) {
    case ACTION_HOVER_ON:
      return {
        ...state,
        hover: true,
      };
    case ACTION_HOVER_OFF:
      return {
        ...state,
        hover: false,
        active: false,
      };
    case ACTION_ACTIVE_ON:
      return {
        ...state,
        active: true,
      };
    case ACTION_ACTIVE_OFF:
      return {
        ...state,
        active: false,
      };
  }

  return state;
}

function transformStateToAttribute(state: State) {
  if (state.active) {
    return 'active';
  }

  if (state.hover) {
    return 'hover';
  }

  return 'normal';
}

const INTERACTION_EVENTS = [
  'pointerdown',
  'pointerenter',
  'pointerleave',
  'pointerout',
  'pointerup',
];

function useInteraction(): [string, (instance: HTMLElement | null) => void] {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useReducer(
    reducer,
    DEFAULT_STATE,
  );

  // cache forever
  const refCallback = useCallback((instance: HTMLElement | null) => {
    function setElementState(event: Event) {
      switch (event.type) {
        case 'pointerdown':
          setState(ACTION_ACTIVE_ON);
          break;
        case 'pointerup':
          setState(ACTION_ACTIVE_OFF);
          break;
        case 'pointerleave':
          setState(ACTION_HOVER_OFF);
          break;
        case 'pointerout':
          setState(ACTION_HOVER_OFF);
          break;
        case 'pointerenter':
          setState(ACTION_HOVER_ON);
          break;
      }
    }

    // being mounted add listeners
    if (instance && !ref.current) {
      ref.current = instance;
      INTERACTION_EVENTS.forEach((eventName) => instance.addEventListener(eventName, setElementState));
    }

    // being unmounted remove listeners
    if (!instance && ref.current) {
      INTERACTION_EVENTS.forEach((eventName) => (ref.current as HTMLElement).removeEventListener(eventName, setElementState));
    }
  }, []);

  return [
    transformStateToAttribute(state),
    refCallback,
  ];
}

export default useInteraction;
