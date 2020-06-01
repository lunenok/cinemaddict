import SmartAbstractComponent from "./smart-abstract-component.js";

export const EMOJIS = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`
];

const createCommentTemplate = (comment) => {
  const {author, text, date, emotion} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

const getCheckedStatus = (status) => {
  if (status) {
    return `checked`;
  }
  return null;
};

const createCommentsTemplate = (comments) => {
  return comments.map((comment) => {
    return createCommentTemplate(comment);
  })
  .join(`\n`);
};

const createGenresTemplate = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  })
  .join(`\n`);
};

const createAddEmojiMarkup = (emotion) => {
  return emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ``;
};


const createFilmDetailsTemplate = (movie, emotion) => {
  const {title, rating, director, writers, actors, realeseCountry, genres, commentsCount, description, poster, comments, isFavorite, isWatched, isToWatch} = movie;

  const _writers = writers.join(`, `);
  const _actors = actors.join(`, `);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

              <p class="film-details__age">18+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${_writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${_actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">30 March 1945</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">1h 18m</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${realeseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${createGenresTemplate(genres)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getCheckedStatus(isToWatch)}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getCheckedStatus(isWatched)}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getCheckedStatus(isFavorite)}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${createCommentsTemplate(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${createAddEmojiMarkup(emotion)}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends SmartAbstractComponent {
  constructor(movie, handler) {
    super();
    this._movie = movie;
    this._emotion = ``;
    this._setCloseButtonClickHandler = null;
    this._setWatchlistClickHandler = null;
    this._setWatchedClickHandler = null;
    this._setFavoriteClickHandler = null;

    this._handler = handler;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._movie, this._emotion);
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._setCloseButtonClickHandler);
    this.setWatchlistClickHandler(this._setWatchlistClickHandler);
    this.setWatchedClickHandler(this._setWatchedClickHandler);
    this.setFavoriteClickHandler(this._setFavoriteClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setCloseButtonClickHandler(handler) {
    const closeButton = this.getElement().querySelector(`.film-details__close`);
    closeButton.addEventListener(`click`, handler);
    this._setCloseButtonClickHandler = handler;
  }

  setWatchlistClickHandler(handler) {
    const watchListButton = this.getElement().querySelector(`input[name="watchlist"]`);
    watchListButton.addEventListener(`click`, handler);
    this._setWatchlistClickHandler = handler;
  }

  setWatchedClickHandler(handler) {
    const watchedButton = this.getElement().querySelector(`input[name="watched"]`);
    watchedButton.addEventListener(`click`, handler);
    this._setWatchedClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    const favoriteButton = this.getElement().querySelector(`input[name="favorite"]`);
    favoriteButton.addEventListener(`click`, handler);
    this._setFavoriteClickHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      this._emotion = evt.target.value;
      this.rerender();
    });
  }

  reset() {
    this._emotion = ``;
    this.rerender();
  }
}
