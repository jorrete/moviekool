import { useParams } from 'react-router-dom';
import Detail from './Detail';
import List from './List';

function Home() {
  const { movieId = null, action = null } = useParams() ;
  const showDetail = movieId !== null && action === 'detail';

  return (
    <>
      <List />
      {showDetail && (
        <Detail
          movieId={movieId}
        />
      )}
    </>
  );
}

export default Home;
