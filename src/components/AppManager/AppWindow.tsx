import {
  useCallback,
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';
import { createPortal } from 'react-dom';
import { ComponentProps, ComponentDefaults } from 'components';
import { AppManagerContext } from './AppManager';
import AppInteraction from './AppInteraction';
import styles from './AppManager.module.scss';

interface AppWindowProps extends ComponentProps {
  onClose?: (result?: unknown) => void,
  open?: boolean,
}

const AppWindowDefaults: AppWindowProps = {
  ...ComponentDefaults,
  open: false,
};

function AppWindow(props: AppWindowProps): JSX.Element | null {
  const {
    children,
    className,
    onClose,
    open: _open,
    ...rest
  } = {
    ...AppWindowDefaults,
    ...props,
  };
  const ref = useRef(null);
  const { windowRef } = useContext(AppManagerContext);
  const [open, setOpen] = useState({
    state: _open,
    value: null,
  });

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const element = (ref.current as HTMLElement);

    element.addEventListener('transitionend', () => {
      if (onClose && !element.hasAttribute('data-open')) {
        onClose(open.value);
      }
    });

    setOpen({
      state: true,
      value: null,
    });
  }, []);
  const onCloseCallback = useCallback((value) => setOpen({ state: false, value, }), []);

  if (windowRef?.current === null) {
    return null;
  }

  return createPortal((
    <div
      ref={ref}
      className={`${styles.AppWindow} ${className}`}
      data-open={open.state ? '' : null}
      {...rest}
    >
      <AppInteraction
        onClose={onCloseCallback}
      >
        {children}
      </AppInteraction>
    </div>
  ), windowRef?.current as Element);
}

export default AppWindow;
