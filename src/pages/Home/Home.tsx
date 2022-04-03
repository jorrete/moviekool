import { useRef } from 'react';
import { AppWindow } from 'components/AppManager';
import Detail from './Detail';
import List from './List';
import Card from 'components/Card';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

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
        <List
          movies={movies}
          onSelection={() => navigate(`/${movie.id}/detail`, { state: { timestamp: timestamp.current } })}
        />
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
