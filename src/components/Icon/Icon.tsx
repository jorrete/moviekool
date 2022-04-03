import { ComponentProps, ComponentDefaults } from 'components';
import { FunctionComponent, SVGProps } from 'react';
import styles from './Icon.module.scss';

import { ReactComponent as cross } from 'icons/cross.svg';
import { ReactComponent as play_arrow } from 'icons/play_arrow.svg';

interface IconsInteface {
  [key: string]: FunctionComponent<SVGProps<SVGSVGElement>>,
}

const icons: IconsInteface = {
  cross,
  play_arrow,
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
