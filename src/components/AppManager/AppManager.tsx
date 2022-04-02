import {
  RefObject,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import styles from './AppManager.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppManagerProps extends ComponentProps {
}

const AppManagerDefaults: AppManagerProps = {
  ...ComponentDefaults,
};

interface AppManagerContextInterface {
  contentRef: RefObject<Element> | null,
  windowRef: RefObject<Element> | null,
  modalRef: RefObject<Element> | null,
  notificationRef: RefObject<Element> | null,
}

const AppManagerContext = createContext<AppManagerContextInterface>({
  contentRef: null,
  windowRef: null,
  modalRef: null,
  notificationRef: null,
});

function AppManager(props: AppManagerProps): JSX.Element {
  const {
    children,
    className,
    style,
    ...rest
  } = {
    ...AppManagerDefaults,
    ...props,
  };

  const contentRef = useRef(null);
  const windowRef = useRef(null);
  const modalRef = useRef(null);
  const notificationRef = useRef(null);
  const [ready, setReady] = useState(false);
  const refs = useMemo((): AppManagerContextInterface => ({
    contentRef,
    windowRef,
    modalRef,
    notificationRef,
  }), [
    ready,
  ]);

  // this helps to not render anything before refs have been assigned
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <AppManagerContext.Provider
      value={refs}
    >
      <div
        className={`${styles.AppManager} ${className}`}
        data-ui="AppManager"
        data-ready={ready ? '' : null}
        style={style}
        {...rest}
      >
        <div
          ref={contentRef}
          data-slot="content"
        >
          {ready && children}
        </div>
        <div
          ref={windowRef}
          data-slot="window"
        />
        <div
          ref={modalRef}
          data-slot="modal"
        />
        <div
          ref={notificationRef}
          data-slot="notification"
        />
      </div>
    </AppManagerContext.Provider>
  );
}

export {
  AppManager as default,
  AppManagerContext,
};
