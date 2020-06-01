import FilmDetailsComponent from "./../components/film-details.js";
import FilmCardComponent from "./../components/film-card.js";
import {render, RenderPosition, remove, replace} from "./../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange) {
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._onDataChange = onDataChange;

    this._container = container;
  }

  render(movie) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    const siteMainElement = document.querySelector(`.main`);
    this._filmCardComponent = new FilmCardComponent(movie);
    this._filmDetailsComponent = new FilmDetailsComponent(movie);

    const showPopup = () => {
      render(siteMainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      this._setPopUpHandlers(movie);
    };

    this._filmCardComponent.setPosterClickHandler(showPopup);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    this._setCardHandlers(movie);
    this._setPopUpHandlers(movie);
  }

  _setCardHandlers(movie) {
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
  }

  _setPopUpHandlers(movie) {
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    const onCloseButtonClick = () => {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent.reset();
    };

    this._filmDetailsComponent.setCloseButtonClickHandler(onCloseButtonClick);

    this._filmDetailsComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isFavorite: !movie.isFavorite,
      }));
    });

    this._filmDetailsComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isWatched: !movie.isWatched,
      }));
    });

    this._filmDetailsComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, movie, Object.assign({}, movie, {
        isToWatch: !movie.isToWatch,
      }));
    });
  }

  remove() {
    this._filmCardComponent.getElement().remove();
  }
}
