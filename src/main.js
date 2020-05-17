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
import {calculateFilters} from "./utils/common.js";
import {render, RenderPosition, remove} from "./utils/render.js";

export const Movies = generateMovies(15);
const filtersCount = calculateFilters(Movies);

const MOVIE_CARD_COUNT = 5;
const TOP_RATED_MOVIE_CARD_COUNT = 2;
const MOST_COMMENTED_MOVIE_CARD_COUNT = 2;

// Рендер управления и главной доски
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`.main`);
const mainBoardComponent = new MainBoardComponent();
const profileComponent = new ProfileComponent();
const menuComponent = new MenuComponent(filtersCount);
const sortingComponent = new SortingComponent();
render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);
render(siteMainElement, sortingComponent, RenderPosition.BEFOREEND);
render(siteMainElement, mainBoardComponent, RenderPosition.BEFOREEND);

const renderMovie = (listComponent, movie) => {
  const filmCardComponent = new FilmCardComponent(movie);
  const filmDetailsComponent = new FilmDetailsComponent(movie);

  const onCloseButtonClick = () => {
    remove(filmDetailsComponent);
  };

  const showPopup = () => {
    render(siteMainElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
    filmDetailsComponent.setCloseButtonClickHandler(onCloseButtonClick);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardComponent.setPosterClickHandler(showPopup);

  render(listComponent, filmCardComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (movies) => {
  if (movies.length === 0) {
    render(mainBoardComponent.getElement(), new NoFilmsComponent(), RenderPosition.AFTERBEGIN);
    return;
  }

  const filmListComponent = new FilmsListComponent();
  const topRatedListElement = new TopRatedFilmsListComponent();
  const mostCommentedListElement = new MostCommentedFilmsListComponent();
  render(mainBoardComponent.getElement(), filmListComponent, RenderPosition.BEFOREEND);
  render(mainBoardComponent.getElement(), topRatedListElement, RenderPosition.BEFOREEND);
  render(mainBoardComponent.getElement(), mostCommentedListElement, RenderPosition.BEFOREEND);

  const filmsContainerElement = filmListComponent.getElement().querySelector(`.films-list__container`);
  const topRatedList = topRatedListElement.getElement().querySelector(`.films-list__container`);
  const mostCommentedList = mostCommentedListElement.getElement().querySelector(`.films-list__container`);

  let showingMoviesCount = MOVIE_CARD_COUNT;

  movies.slice(0, showingMoviesCount)
    .forEach((movie) => renderMovie(filmsContainerElement, movie));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmListComponent.getElement(), showMoreButtonComponent, RenderPosition.BEFOREEND);

  const showMoreButton = filmListComponent.getElement().querySelector(`.films-list__show-more`);

  showMoreButtonComponent.setClickHandler(() => {
    const prevMoviesCount = showingMoviesCount;
    showingMoviesCount = showingMoviesCount + MOVIE_CARD_COUNT;

    movies.slice(prevMoviesCount, showingMoviesCount)
      .forEach((movie) => renderMovie(filmsContainerElement, movie));

    if (showingMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });

  for (let i = 0; i < TOP_RATED_MOVIE_CARD_COUNT; i++) {
    renderMovie(topRatedList, movies[2]);
  }

  for (let i = 0; i < MOST_COMMENTED_MOVIE_CARD_COUNT; i++) {
    renderMovie(mostCommentedList, movies[3]);
  }
};

renderBoard(Movies);
