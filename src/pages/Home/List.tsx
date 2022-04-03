import { ComponentProps, ComponentDefaults } from 'components';
import useTMDB from 'hooks/useTMDB';
import Button from 'components/Button';
import Card from 'components/Card';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ListProps extends Omit<ComponentProps, 'children'> {
}

const ListDefaults: Omit<ComponentProps, 'movie'> = {
  ...ComponentDefaults,
};

function List(props: ListProps): JSX.Element {
  const {
    className,
    style,
    ...rest
  } = {
    ...ListDefaults,
    ...props,
  };
  const { getMovieList } = useTMDB();
  const movies = getMovieList();
  const navigate = useNavigate();

  return (
    <Card
      header={(
        <div>home</div>
      )}
    >
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
              onClick={() => navigate(`/${movie.id}/detail`)}
            >
              {`detail ${movie.name} (${movie.id})`}
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default List;
