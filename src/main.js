import {createProfileTemplate} from "./components/profile.js";
import {createMenuTemplate} from "./components/menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createMainBoardTemplate} from "./components/main-board.js";
import {createFilmsListTemplate} from "./components/film-list.js";
import {createTopRatedFilmsListTemplate} from "./components/top-rated-list.js";
import {createMostCommentedFilmsListTemplate} from "./components/most-commented-list.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const MOVIE_CARD_COUNT = 5;
const TOP_RATED_MOVIE_CARD_COUNT = 2;
const MOST_COMMENTED_MOVIE_CARD_COUNT = 2;

// Рендер управления и главной доски
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`.main`);
render(siteHeaderElement, createProfileTemplate());
render(siteMainElement, createMenuTemplate());
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createMainBoardTemplate());

// Рендер контейнеров для фильмов и кнопки
const mainBoardElement = document.querySelector(`.films`);
render(mainBoardElement, createFilmsListTemplate());
render(mainBoardElement, createTopRatedFilmsListTemplate());
render(mainBoardElement, createMostCommentedFilmsListTemplate());

// Рендер элементов (фильмов и кнопки) внутри контейнеров
const filmsListElement = document.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
const topRatedListElement = document.querySelector(`.films-list--top`).querySelector(`.films-list__container`);
const mostCommentedListElement = document.querySelector(`.films-list--commented`).querySelector(`.films-list__container`);

for (let i = 0; i < MOVIE_CARD_COUNT; i++) {
  render(filmsContainerElement, createFilmCardTemplate());
}

for (let i = 0; i < TOP_RATED_MOVIE_CARD_COUNT; i++) {
  render(topRatedListElement, createFilmCardTemplate());
}

for (let i = 0; i < MOST_COMMENTED_MOVIE_CARD_COUNT; i++) {
  render(mostCommentedListElement, createFilmCardTemplate());
}

render(filmsListElement, createShowMoreButtonTemplate());

