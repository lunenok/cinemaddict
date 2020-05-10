import {createElement} from "./../utils.js";

export const createTopRatedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--top">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class TopRatedFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTopRatedFilmsListTemplate();
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
