import {  ReactElement } from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import Frame from 'components/Frame';
import styles from './Card.module.scss';

interface CardProps extends ComponentProps {
  header?: ReactElement,
  footer?: ReactElement,
}

const CardDefaults: CardProps = {
  ...ComponentDefaults,
};

function Card(props: CardProps): JSX.Element {
  const {
    children,
    className,
    style,
    header,
    footer,
    ...rest
  } = {
    ...CardDefaults,
    ...props,
  };

  return (
    <Frame
      className={`${styles.Card} ${className}`}
      direction="column"
      expand
      data-ui="Card"
      style={style}
      {...rest}
    >
      <>
        {header && (
          <Frame
            data-slot="header"
          >
            {header}
          </Frame>
        )}
      </>
      <div
        data-frame="auto"
      >
        {children}
      </div>
      <>
        {footer && (
          <Frame
            data-slot="footer"
          >
            {footer}
          </Frame>
        )}
      </>
    </Frame>
  );
}

export default Card;
