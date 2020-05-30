import AbstarctComponent from "./abstract-component.js";

const createFilmCardTemplate = (movie) => {
  const {title, rating, realeseDate, genres, commentsCount, description, poster, isFavorite, isWatched, isToWatch} = movie;

  const getActiveClass = (boolean) => {
    if (boolean) {
      return `film-card__controls-item--active`;
    }
    return null;
  };

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${realeseDate}</span>
        <span class="film-card__duration">1h 55m</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getActiveClass(isToWatch)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getActiveClass(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${getActiveClass(isFavorite)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstarctComponent {
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createFilmCardTemplate(this._movie);
  }

  setPosterClickHandler(handler) {
    const movieCardPoster = this.getElement().querySelector(`.film-card__poster`);
    movieCardPoster.addEventListener(`click`, handler);
  }

  setWatchlistClickHandler(handler) {
    const watchListButton = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    watchListButton.addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    const watchedButton = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    watchedButton.addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    const favoriteButton = this.getElement().querySelector(`.film-card__controls-item--favorite`);
    favoriteButton.addEventListener(`click`, handler);
  }
}
