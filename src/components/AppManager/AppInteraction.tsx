import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  RefObject,
} from 'react';
import { ComponentProps, ComponentDefaults } from 'components';

interface AppInteractionProps extends ComponentProps {
  onClose: (result: unknown) => undefined,
}

const AppInteractionDefaults: AppInteractionProps = {
  ...ComponentDefaults,
  onClose: () => undefined,
};

const AppInteractionContext = createContext((value: unknown) => undefined);

function AppInteraction(props: AppInteractionProps): JSX.Element {
  const {
    onClose,
    children,
  } = {
    ...AppInteractionDefaults,
    ...props,
  };

  const closeCallback = useCallback((value: unknown) => onClose(value), []);

  return (
    <AppInteractionContext.Provider
      value={closeCallback}
    >
      {children}
    </AppInteractionContext.Provider>
  );
}

function useAppInteraction() {
  return useContext(AppInteractionContext);
}

export {
  AppInteraction as default,
  useAppInteraction,
};
