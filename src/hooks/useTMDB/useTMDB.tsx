import { useMemo } from 'react';

export interface MovieListItemInterface {
  id: number,
  name: string,
}

export interface MovieDetailInterface {
  id: number,
  name: string,
}

interface TMDBInterface {
  getMovieList: () => MovieListItemInterface[],
  getMovieDetail: (id: number) => MovieDetailInterface,
}

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

function useTMDB(): TMDBInterface {
  return useMemo(() => ({
    getMovieList: () => movies,
    getMovieDetail: (id) => movies[id],
  }), []);
}

export default useTMDB;
