import { useMemo } from 'react';
const TMDB_API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

export interface MovieListItemInterface {
  id: number,
  original_title: string,
  vote_average: number,
  poster_path: string,
  overview: string,
}

export interface MovieListInterface {
  page: number,
  results: MovieListItemInterface[],
  total_pages: number,
  total_results: number,
}

export interface MovieDetailInterface extends MovieListItemInterface {
  spoken_languages?: unknown,
}

interface TMDBInterface {
  getMovieList: () => Promise<MovieListInterface>,
  getMovieDetail: (id: number) => Promise<MovieDetailInterface>,
}

function buildAPICall(path: string): string {
  return `https://api.themoviedb.org/3${path}?api_key=${TMDB_API_TOKEN}`;
}

function buildImagePath(image: string): string {
  return `https://image.tmdb.org/t/p/w500${image}`;
}

function prepareImage(movie: MovieListItemInterface): MovieListItemInterface {
  return {
    ...movie,
    poster_path: buildImagePath(movie.poster_path),
  };
}

function prepareImages(movieList: MovieListInterface): MovieListInterface {
  return {
    ...movieList,
    results: movieList.results.map(prepareImage),
  };
}

function APICall(path: string) {
  return fetch(buildAPICall(path))
    .then((response) => response.json());
}

function useTMDB(): TMDBInterface {
  return useMemo(() => ({
    getMovieList: (): Promise<MovieListInterface> => APICall('/movie/popular').then(prepareImages),
    getMovieDetail: (id): Promise<MovieDetailInterface>=> APICall(`/movie/${id}`).then(prepareImage),
  }), []);
}

export default useTMDB;
