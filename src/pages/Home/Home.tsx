import { useParams } from 'react-router-dom';
import Detail from './Detail';
import List from './List';

function Home() {
  const { movieId = null } = useParams() ;

  return (
    <>
      <List />
      {movieId !== null && (
        <Detail
          movieId={movieId}
        />
      )}
    </>
  );
}

export default Home;
