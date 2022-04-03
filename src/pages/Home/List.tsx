import { ComponentProps, ComponentDefaults } from 'components';
import Button from 'components/Button';
import styles from './Home.module.scss';

export interface MovieInterface {
  id: number,
  name: string,
}

interface ListProps extends Omit<ComponentProps, 'children'> {
  movies: MovieInterface[],
  onSelection: () => void,
}

const ListDefaults: Omit<ComponentProps, 'movie'> = {
  ...ComponentDefaults,
};

function List(props: ListProps): JSX.Element {
  const {
    className,
    style,
    movies,
    onSelection,
    ...rest
  } = {
    ...ListDefaults,
    ...props,
  };

  return (
    <ul
      className={`${styles.List} ${className}`}
      data-ui="List"
      style={style}
      {...rest}
    >
      {movies.map((movie) => (
        <li
          key={movie.id}
        >
          <Button
            onClick={onSelection}
          >
            {`detail ${movie.name} (${movie.id})`}
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default List;
