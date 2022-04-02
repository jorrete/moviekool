import {
  useCallback,
  useContext,
  createContext,
} from 'react';
import { ComponentProps, ComponentDefaults } from 'components';

interface AppInteractionProps extends ComponentProps {
  onClose: (result?: unknown) => void,
}

const AppInteractionDefaults: AppInteractionProps = {
  ...ComponentDefaults,
  onClose: () => void 0,
};

const AppInteractionContext = createContext(() => void 0);

function AppInteraction(props: AppInteractionProps): JSX.Element {
  const {
    onClose,
    children,
  } = {
    ...AppInteractionDefaults,
    ...props,
  };

  const closeCallback = useCallback((value?: unknown) => onClose(value), []);

  return (
    <AppInteractionContext.Provider
      value={closeCallback as () => undefined}
    >
      {children}
    </AppInteractionContext.Provider>
  );
}

function useAppInteraction(): (value?: unknown) => void {
  return useContext(AppInteractionContext);
}

export {
  AppInteraction as default,
  useAppInteraction,
};
