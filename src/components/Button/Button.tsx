import { MutableRefObject, useReducer, useRef, useEffect, LegacyRef, MouseEventHandler } from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import useElementInteraction from 'hooks/useInteraction';
import stylesInteraction from 'hooks/useInteraction/useInteraction.module.scss';
import styles from './Button.module.scss';

interface ButtonProps extends ComponentProps {
  disabled?: boolean,
  onClick?: MouseEventHandler,
}

const ButtonDefaults: ButtonProps = {
  ...ComponentDefaults,
  disabled: false,
};

function Button(props: ButtonProps): JSX.Element {
  const {
    children,
    className,
    disabled,
    style,
    onClick,
    ...rest
  } = {
    ...ButtonDefaults,
    ...props,
  };
  const [interaction, ref] = useElementInteraction();

  return (
    <div
      className={`${stylesInteraction.useInteraction} ${styles.Button} ${className}`}
      data-disabled={disabled ? '' : null}
      data-interaction={interaction}
      data-ui="Button"
      ref={ref}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Button;
