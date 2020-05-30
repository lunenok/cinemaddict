import FilmDetailsComponent from "./../components/film-details.js";
import FilmCardComponent from "./../components/film-card.js";
import {render, RenderPosition, remove} from "./../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange) {
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;

    this._container = container;
  }

  render(movie) {
    const siteMainElement = document.querySelector(`.main`);
    this._filmCardComponent = new FilmCardComponent(movie);
    this._filmDetailsComponent = new FilmDetailsComponent(movie);

    const onCloseButtonClick = () => {
      remove(this._filmDetailsComponent);
    };

    const showPopup = () => {
      render(siteMainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
      this._filmDetailsComponent.setCloseButtonClickHandler(onCloseButtonClick);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCardComponent.setPosterClickHandler(showPopup);

    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._filmCardComponent.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._filmCardComponent.setWatchlistClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isToWatch: !movie.isToWatch,
      }));
    });

    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }
}
