import { ComponentProps, ComponentDefaults } from 'components';
import { ReactComponent as cross } from 'icons/cross.svg';
import { FunctionComponent, SVGProps } from 'react';
import styles from './Icon.module.scss';

interface IconsInteface {
  [key: string]: FunctionComponent<SVGProps<SVGSVGElement>>,
}

const icons: IconsInteface = {
  cross,
};

interface IconProps extends Omit<ComponentProps, 'children'> {
  id: string,
}

const IconDefaults = {
  ...ComponentDefaults,
};

function Icon(props: IconProps): JSX.Element {
  const {
    className,
    style,
    id,
    ...rest
  } = {
    ...IconDefaults,
    ...props,
  };

  const SVG = icons[id];

  return (
    <div
      className={`${styles.Icon} ${className}`}
      data-ui="Icon"
      style={style}
      {...rest}
    >
      <SVG />
    </div>
  );
}

export default Icon;
