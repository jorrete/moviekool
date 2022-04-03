import {  useEffect, useRef, useReducer } from 'react';
import { ComponentProps, ComponentDefaults } from 'components';
import useTMDB from 'hooks/useTMDB';
import Button from 'components/Button';
import Icon from 'components/Icon';
import Card from 'components/Card';
import Frame from 'components/Frame';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import title from 'images/MovieKOOL.svg';
import {
  reducer,
  DEFAULT_STATE,
  update,
  focus,
} from './ListReducer';

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
  const ref = useRef(null);
  const [state, setState] = useReducer(
    reducer,
    DEFAULT_STATE,
  );

  useEffect(() => {
    (async () => {
      const movies = await getMovieList();
      const windowWidth = window.innerWidth;
      const style = window.getComputedStyle(document.body as unknown as HTMLElement);
      const cardWidth = parseInt(style.getPropertyValue('--List-item-width'));
      const cardPadding = parseInt(style.getPropertyValue('--List-item-padding'));
      const offset = windowWidth / 2 - cardPadding - cardWidth / 2;
      setState(update({
        list: movies.results,
        cardWidth,
        cardPadding,
        offset,
      }));
    })();
  }, []);

  return (
    <Card
      className={`${styles.List} ${className}`}
      data-ui="List"
      style={style}
      header={(
        <img
          src={title}
          alt="title"
        />
      )}
      footer={(
        <Frame>
          <div
            data-frame="auto"
          >
            <Button
              onClick={() => setState(focus(state.focused - 1))}
              data-prev
            >
              <Icon
                id="play_arrow"
              />
            </Button>
          </div>
          <div
            data-frame="auto"
          >
            <Button
              onClick={() => setState(focus(state.focused + 1))}
              data-next
            >
              <Icon
                id="play_arrow"
              />
            </Button>
          </div>
        </Frame>
      )}
      {...rest}
    >
      <ul
        ref={ref}
        style={{
          '--List-offset': `${state.offset}px`,
          '--List-delta-x': `-${state.deltaX}px`,
        } as React.CSSProperties}
      >
        {state.list.map((movie, index) => (
          <li
            data-focused={state.focused === index ?  '' : null}
            key={movie.id}
          >
            <div
              style={{
                backgroundImage: `url(${movie.poster_path})`,
              }}
            >
              <span
                data-vote
              >
                {movie.vote_average}
              </span>
              <Button
                onClick={() => navigate(`/${movie.id}/detail`)}
                data-watch
              >
                watch
              </Button>
              <span
                data-title
              >
                {movie.original_title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default List;
