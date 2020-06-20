import AbstarctComponent from "./abstract-component.js";
import {FilterType} from "./../const.js";

const createFilterMarkup = (filter) => {
  const {name, count, checked} = filter;

  const createCountMarkup = () => {
    if (name !== FilterType.ALL) {
      return (
        `<span class="main-navigation__item-count">${count}</span>`
      );
    } else {
      return ``;
    }
  };

  return (
    `<a href="#" id="${name}" class="main-navigation__item ${checked ? `main-navigation__item--active` : null}">${name}${createCountMarkup()}</a>
    `
  );
};

export const createMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" id="statisic" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu extends AbstarctComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createMenuTemplate(this._filters);
  }

  setOnMenuItemClick(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A`) {
        return;
      }
      const choosenMenu = evt.target.id;
      handler(choosenMenu);
    });
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItems = document.querySelectorAll(`.main-navigation__item`);
      // const menuAdditionalItem = document.querySelector(`.main-navigation__additional`);

      if (evt.target.classList.contains(`main-navigation__additional`)) {
        menuItems.forEach((item) => item.classList.remove(`main-navigation__item--active`));
        evt.target.classList.add(`main-navigation__item--active`);
      } else if (evt.target.classList.contains(`main-navigation__item`)) {
        this.getElement().querySelector(`.main-navigation__additional`).classList.remove(`main-navigation__item--active`);
      }

      const filterName = evt.target.id;
      handler(filterName);
    });
  }

}
