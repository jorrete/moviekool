import { MutableRefObject, useReducer, useRef, useEffect, LegacyRef } from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import styles from './Frame.module.scss';

interface FrameProps extends ComponentProps {
  direction?: string,
  expand?: boolean,
}

const FrameDefaults: FrameProps = {
  ...ComponentDefaults,
  direction: 'row',
  expand: false,
};

function Frame(props: FrameProps): JSX.Element {
  const {
    children,
    className,
    style,
    direction,
    expand,
    ...rest
  } = {
    ...FrameDefaults,
    ...props,
  };

  return (
    <div
      className={`${styles.Frame} ${className}`}
      data-direction={direction}
      data-expand={expand ? '' : null}
      data-ui="Frame"
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Frame;
