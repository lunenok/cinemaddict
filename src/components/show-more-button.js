import {createElement} from "./../utils.js";

export const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMoreButton {
  constructor(task) {
    this._task = task;

    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonTemplate(this._task);
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
