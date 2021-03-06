import Menu from "../components/menu.js";
import {FilterType} from "../const.js";
import {render, replace, RenderPosition} from "../utils/render.js";
import {getMoviesByFilter} from "../utils/filter.js";

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this.setOnMenuItemClick = this.setOnMenuItemClick.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getAllMovies();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new Menu(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (this._onMenuItemClick) {
      this._filterComponent.setOnMenuItemClick(this._onMenuItemClick);
    }

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }
  }

  setOnMenuItemClick(handler) {
    this._filterComponent.setOnMenuItemClick(handler);
    this._onMenuItemClick = handler;
  }

  show() {
    this._container.show();
  }

  hide() {
    this._container.hide();
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
    this.render();
  }

  _onDataChange() {
    this.render();
  }
}
