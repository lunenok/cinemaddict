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
import NoFilmsComponent from "./components/no-films.js";
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

const renderMovie = (listComponent, movie) => {
  const filmCardComponent = new FilmCardComponent(movie);
  const movieCardPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);

  const filmDetailsComponent = new FilmDetailsComponent(movie);

  const onCloseButtonClick = () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();
  };

  const onMovieCardClick = () => {
    const closeButton = filmDetailsComponent.getElement().querySelector(`.film-details__close`);
    render(siteMainElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
    closeButton.addEventListener(`click`, onCloseButtonClick);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmDetailsComponent.getElement().remove();
      filmDetailsComponent.removeElement();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  movieCardPoster.addEventListener(`click`, onMovieCardClick);

  render(listComponent, filmCardComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (movies) => {
  const mainBoardElement = document.querySelector(`.films`);

  if (movies.length === 0) {
    render(mainBoardElement, new NoFilmsComponent().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(mainBoardElement, new FilmsListComponent().getElement(), RenderPosition.BEFOREEND); // Не рендерит
  render(mainBoardElement, new TopRatedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainBoardElement, new MostCommentedFilmsListComponent().getElement(), RenderPosition.BEFOREEND);

  const filmsListElement = document.querySelector(`.films-list`);
  const filmsContainerElement = filmsListElement.querySelector(`.films-list__container`);
  const topRatedListElement = document.querySelector(`.films-list--top`).querySelector(`.films-list__container`);
  const mostCommentedListElement = document.querySelector(`.films-list--commented`).querySelector(`.films-list__container`);

  let showingMoviesCount = MOVIE_CARD_COUNT;

  movies.slice(0, showingMoviesCount)
    .forEach((movie) => renderMovie(filmsContainerElement, movie));

  render(filmsListElement, new ShowMoreButtonComponent().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, () => {
    const prevMoviesCount = showingMoviesCount;
    showingMoviesCount = showingMoviesCount + MOVIE_CARD_COUNT;

    movies.slice(prevMoviesCount, showingMoviesCount)
      .forEach((movie) => renderMovie(filmsContainerElement, movie));

    if (showingMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });

  for (let i = 0; i < TOP_RATED_MOVIE_CARD_COUNT; i++) {
    renderMovie(topRatedListElement, movies[2]);
  }

  for (let i = 0; i < MOST_COMMENTED_MOVIE_CARD_COUNT; i++) {
    renderMovie(mostCommentedListElement, movies[3]);
  }
};

renderBoard(Movies);
