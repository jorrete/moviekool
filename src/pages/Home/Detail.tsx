import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppWindow } from 'components/AppManager';
import useTMDB from 'hooks/useTMDB';
import { ComponentProps, ComponentDefaults } from 'components';
import Button from 'components/Button';
import Card from 'components/Card';
import { useAppInteraction } from 'components/AppManager';
import styles from './Home.module.scss';
import { MovieDetailInterface } from 'hooks/useTMDB/useTMDB';
import Frame from 'components/Frame';
import Icon from 'components/Icon';

interface DetailProps extends Omit<ComponentProps, 'children'> {
  movieId: string,
}

const DetailDefaults: Omit<ComponentProps, 'movie'> = {
  ...ComponentDefaults,
};

function Detail(props: DetailProps): JSX.Element {
  const {
    className,
    style,
    movieId,
    ...rest
  } = {
    ...DetailDefaults,
    ...props,
  };
  const closeInteraction = useAppInteraction();
  const { getMovieDetail } = useTMDB();
  const [item, setItem] = useState(null as (null | MovieDetailInterface));

  useEffect(() => {
    (async () => {
      const movie = await getMovieDetail(parseInt(movieId));

      setItem(movie as MovieDetailInterface);
    })();
  }, []);

  return (
    <Card
      className={`${styles.Detail} ${className}`}
      data-ui="Detail"
      style={style}
      header={(
        <Frame>
          <div
            data-frame="auto"
          >
            Detail
          </div>
          <div>
            <Button
              onClick={() => closeInteraction()}
            >
              <Icon
                id="cross"
              />
            </Button>
          </div>
        </Frame>
      )}
      {...rest}
    >
      {item && (
        <>
          <div>
            {item.original_title}
          </div>
        </>
      )}
    </Card>
  );
}

// INFO this split betwen component and wrapper
// must be done because you cant define and consume
// a context in the same component
function DetailWrapper(props: DetailProps): JSX.Element {
  const {
    movieId,
  } = {
    ...DetailDefaults,
    ...props,
  };
  const navigate = useNavigate();

  return (
    <AppWindow
      onClose={() => navigate(`/${movieId}`)}
    >
      <Detail
        {...props}
      />
    </AppWindow>
  );
}

export default DetailWrapper;
