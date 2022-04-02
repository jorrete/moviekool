export interface ComponentProps {
  children?: JSX.Element | JSX.Element[] | number | boolean | string | null | undefined,
  className?: string,
  style?: React.CSSProperties,
}

export const ComponentDefaults = {
  children: undefined,
  className: '',
  style: undefined,
};
