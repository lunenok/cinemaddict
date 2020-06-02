import FilmDetailsComponent from "./../components/film-details.js";
import FilmCardComponent from "./../components/film-card.js";
import {render, RenderPosition, remove, replace} from "./../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};
export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;
    this._onViewChange = onViewChange;
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
      this._onViewChange();
      this._mode = Mode.POPUP;
    };

    this._filmCardComponent.setPosterClickHandler(showPopup);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);

    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }

    this._setPopUpHandlers(movie);
    this._setCardHandlers(movie);
  }

  _removeExcessCommentsById(comments, id) {
    return comments.filter((comment) => {
      return comment.id.toString() !== id.toString();
    });
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
        this._mode = Mode.DEFAULT;
        remove(this._filmDetailsComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
        document.removeEventListener(`keydown`, onCntrlEnterDown);
      }
    };

    const onCntrlEnterDown = (evt) => {
      const isCntrlEnter = (evt.ctrlKey || evt.metaKey) && evt.key === `Enter`;

      if (isCntrlEnter) {
        const comment = this._filmDetailsComponent.getComment();
        if (!comment.text) {
          return;
        }
        this._onDataChange(this, movie, Object.assign({}, movie, {
          comments: movie.comments.concat(comment),
        }));
        document.removeEventListener(`keydown`, onCntrlEnterDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);
    document.addEventListener(`keydown`, onCntrlEnterDown);

    const onCloseButtonClick = () => {
      remove(this._filmDetailsComponent);
      this._filmDetailsComponent.reset();
      this._mode = Mode.DEFAULT;
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

    this._filmDetailsComponent.setDeleteHandler((evt) => {
      evt.preventDefault();
      const id = evt.target.id;
      this._onDataChange(this, movie, Object.assign({}, movie, {
        comments: this._removeExcessCommentsById(movie.comments, id),
      }));
    });

  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._mode = Mode.DEFAULT;
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  remove() {
    this._filmCardComponent.getElement().remove();
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
