import { useState, useEffect } from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import useTMDB from 'hooks/useTMDB';
import Button from 'components/Button';
import Card from 'components/Card';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { MovieListItemInterface } from 'hooks/useTMDB/useTMDB';

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
  const navigate = useNavigate();
  const [list, setList] = useState([] as MovieListItemInterface[]);

  useEffect(() => {
    (async () => {
      const movies = await getMovieList();

      setList(movies.results as MovieListItemInterface[]);
    })();
  }, []);

  return (
    <Card
      className={`${styles.List} ${className}`}
      data-ui="List"
      style={style}
      header={(
        <div>List</div>
      )}
      {...rest}
    >
      <ul>
        {list.map((movie) => (
          <li
            key={movie.id}
          >
            <Button
              onClick={() => navigate(`/${movie.id}/detail`)}
            >
              <span>
                {movie.original_title}
              </span>
              <span>
                {movie.vote_average}
              </span>
              <img
                src={movie.poster_path}
                alt={movie.original_title}
              />
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default List;
