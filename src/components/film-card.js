import {createElement} from "./../utils.js";

const createFilmCardTemplate = (movie) => {
  const {title, rating, realeseDate, genres, commentsCount, description, poster} = movie;

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
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
