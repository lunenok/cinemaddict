// import AbstractComponent from "./abstract-component.js";
import SmartAbstractComponent from "./smart-abstract-component.js";

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const createSortingTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends SmartAbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._setSortTypeHangler = null;
  }

  getTemplate() {
    return createSortingTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  _toStyleActiveSortButton(target) {
    const sortingItem = document.querySelectorAll(`.sort__button`);
    sortingItem.forEach((item) => item.classList.remove(`sort__button--active`));
    target.classList.add(`sort__button--active`);
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._setSortTypeHangler);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._toStyleActiveSortButton(evt.target);

      this._currentSortType = sortType;

      this._setSortTypeHangler = handler;
      handler(this._currentSortType);
    });

  }
}
