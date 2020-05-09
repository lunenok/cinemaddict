import ProfileComponent from "./components/profile.js";
import MenuComponent from "./components/menu.js";
import SortingComponent from "./components/sorting.js";
import MainBoardComponent from "./components/main-board.js";
import FilmsListComponent from "./components/film-list.js";
import TopRatedFilmsListComponent from "./components/top-rated-list.js";
import MostCommentedFilmsListComponent from "./components/most-commented-list.js";
import FilmCardComponent from "./components/film-card.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmDetailsComponent from "./components/film-details.js";
import {generateMovies} from "./mock/mock.js";
import {calculateFilters, render, RenderPosition} from "./utils.js";

export const Movies = generateMovies(15);
const filtersCount = calculateFilters(Movies);

const MOVIE_CARD_COUNT = 5;
const TOP_RATED_MOVIE_CARD_COUNT = 2;
const MOST_COMMENTED_MOVIE_CARD_COUNT = 2;

// Рендер управления и главной доски
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`.main`);
render(siteHeaderElement, new ProfileComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MenuComponent(filtersCount).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainBoardComponent().getElement(), RenderPosition.BEFOREEND);

// Рендер контейнеров для фильмов и кнопки
const mainBoardElement = document.querySelector(`.films`);
render(mainBoardElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND); // Не рендерит
render(mainBoardElement, new TopRatedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);
render(mainBoardElement, new MostCommentedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);

// Рендер элементов (фильмов и кнопки) внутри контейнеров
const filmsListElement = document.querySelector(`.films-list`);
const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
const topRatedListElement = document.querySelector(`.films-list--top`).querySelector(`.films-list__container`);
const mostCommentedListElement = document.querySelector(`.films-list--commented`).querySelector(`.films-list__container`);

const renderMovie = (movie) => {
  const onMovieCardClick = () => {
    render(siteMainElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const onCloseButtonClick = () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();
  }; // В задании просят реализовать через removeChild и appendChild.

  const filmCardComponent = new FilmCardComponent(movie);
  const movieCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  movieCardPoster.addEventListener(`click`, onMovieCardClick);

  const filmDetailsComponent = new FilmDetailsComponent(movie);
  const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close`);
  closeButton.addEventListener(`click`, onCloseButtonClick);

  render(filmsContainerElement, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

let showingMoviesCount = MOVIE_CARD_COUNT;

Movies.slice(0, showingMoviesCount)
  .forEach((movie) => renderMovie(movie));

render(filmsListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevMoviesCount = showingMoviesCount;
  showingMoviesCount = showingMoviesCount + MOVIE_CARD_COUNT;

  Movies.slice(prevMoviesCount, showingMoviesCount)
    .forEach((movie) => renderMovie(movie));

  if (showingMoviesCount >= Movies.length) {
    showMoreButton.remove();
  }
});

for (let i = 0; i < TOP_RATED_MOVIE_CARD_COUNT; i++) {
  render(topRatedListElement, new FilmCardComponent(Movies[2]).getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < MOST_COMMENTED_MOVIE_CARD_COUNT; i++) {
  render(mostCommentedListElement, new FilmCardComponent(Movies[3]).getElement(), RenderPosition.BEFOREEND);
}

