import {createElement} from "./../utils.js";

export const createMostCommentedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
    `
  );
};

export default class MostCommentedFilmsList {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsListTemplate(this._task);
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
