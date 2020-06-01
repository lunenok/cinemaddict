import moment from "moment";

export const formatDuration = (mins) => {
  const duration = moment.duration(mins, `minutes`);
  return moment.utc(duration.as(`milliseconds`)).format(`H[h] mm[m]`);
};

export const formatYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).fromNow();
};

export const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

export const getRandomIntegerNumber = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getRandomElement = (array) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

export const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const calculateFilters = (movies) => {
  const watchlistCount = movies.filter((movie) => {
    return movie.isToWatch === true;
  }).length;
  const historyCount = movies.filter((movie) => {
    return movie.isWatched === true;
  }).length;
  const favoriteCount = movies.filter((movie) => {
    return movie.isFavorite === true;
  }).length;

  return {
    watchlist: watchlistCount,
    history: historyCount,
    favorite: favoriteCount
  };
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
