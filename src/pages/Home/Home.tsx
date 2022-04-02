import { useRef, useState } from 'react';
import { AppWindow } from 'components/AppManager';
import Button from 'components/Button';
import Detail from './Detail';
import Card from 'components/Card';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

interface Params {
  movieId?: null | string,
  action?: null | string,
}

interface URLState {
  timestamp?: number,
}

function Home() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const timestamp = useRef(new Date().getTime());
  const { movieId = null, action = null } = useParams() ;
  const showDetail = movieId !== null && action === 'detail';
  const initialDetail = (
    (state as URLState)?.timestamp !== timestamp.current
  );
  const movies = [
    {
      id: 0,
      name: 'foo',
    },
    {
      id: 1,
      name: 'bar',
    },
    {
      id: 2,
      name: 'mongo',
    },
  ];
  const movie = movies[Number(movieId)];

  return (
    <>
      <Card
        header={(
          <div>home</div>
        )}
      >
        <ul>
          {movies.map((movie) => (
            <li
              key={movie.id}
            >
              <Button
                onClick={() => navigate(`/${movie.id}/detail`, { state: { timestamp: timestamp.current } })}
              >
                {`detail ${movie.name} (${movie.id})`}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
      {showDetail && (
        <AppWindow
          onClose={() => navigate(`/${movieId}`)}
          open={initialDetail}
        >
          <Detail
            movie={movie}
          />
        </AppWindow>
      )}
    </>
  );
}

export default Home;
