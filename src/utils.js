export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
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
    return movie.userDetails.watchlist === true;
  }).length;
  const historyCount = movies.filter((movie) => {
    return movie.userDetails.alreadyWatched === true;
  }).length;
  const favoriteCount = movies.filter((movie) => {
    return movie.userDetails.favorite === true;
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

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};
