import {FilterType} from "../const.js";

export const getWatchlistFilms = (movies) => {
  return movies.filter((movie) => movie.isToWatch);
};

export const getWatchedFilms = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

export const getFavoriteFilms = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return Array.from(movies);
    case FilterType.WATCHLIST:
      return getWatchlistFilms(movies);
    case FilterType.HISTORY:
      return getWatchedFilms(movies);
    case FilterType.FAVORITES:
      return getFavoriteFilms(movies);
  }

  return movies;
};
