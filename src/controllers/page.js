import SortingComponent, {SortType} from "./../components/sorting.js";
import FilmsListComponent from "./../components/film-list.js";
import TopRatedFilmsListComponent from "./../components/top-rated-list.js";
import MostCommentedFilmsListComponent from "./../components/most-commented-list.js";
import FilmCardComponent from "./../components/film-card.js";
import ShowMoreButtonComponent from "./../components/show-more-button.js";
import FilmDetailsComponent from "./../components/film-details.js";
import NoFilmsComponent from "./../components/no-films.js";
import {render, RenderPosition, remove} from "./../utils/render.js";

const MOVIE_CARD_COUNT = 5;
const TOP_RATED_MOVIE_CARD_COUNT = 2;
const MOST_COMMENTED_MOVIE_CARD_COUNT = 2;

const getSortedMovies = (movies, sortType) => {
  let sortedMovies = [];
  const showingMovies = movies.slice();

  switch (sortType) {
    case SortType.DATE:
      sortedMovies = showingMovies.sort((a, b) => a.realeseDate - b.realeseDate);
      break;
    case SortType.RATING:
      sortedMovies = showingMovies.sort((a, b) => a.rating - b.rating);
      break;
    case SortType.DEFAULT:
      sortedMovies = showingMovies;
      break;
  }

  return sortedMovies;
};

const renderMovie = (listComponent, movie) => {
  const siteMainElement = document.querySelector(`.main`);
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

export default class PageController {
  constructor(container) {
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsListComponent = new TopRatedFilmsListComponent();
    this._mostCommentedFilmsListComponent = new MostCommentedFilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent();

    this._container = container;
  }

  render(movies) {
    const container = this._container.getElement();

    if (movies.length === 0) {
      render(container, new NoFilmsComponent(), RenderPosition.AFTERBEGIN);
      return;
    }

    render(container, this._sortingComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);

    const filmsContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);
    const topRatedList = this._topRatedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    const mostCommentedList = this._mostCommentedFilmsListComponent.getElement().querySelector(`.films-list__container`);

    let showingMoviesCount = MOVIE_CARD_COUNT;

    movies.slice(0, showingMoviesCount)
      .forEach((movie) => renderMovie(filmsContainerElement, movie));

    const renderLoadMoreButton = () => {
      if (showingMoviesCount >= movies.length) {
        return;
      }

      render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevMoviesCount = showingMoviesCount;
        showingMoviesCount = showingMoviesCount + MOVIE_CARD_COUNT;

        const sortedMovies = getSortedMovies(movies, this._sortingComponent.getSortType());
        sortedMovies.slice(prevMoviesCount, showingMoviesCount)
          .forEach((movie) => renderMovie(filmsContainerElement, movie));

        if (showingMoviesCount >= movies.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      showingMoviesCount = MOVIE_CARD_COUNT;
      const sortedMovies = getSortedMovies(movies, sortType);

      filmsContainerElement.innerHTML = ``;

      sortedMovies.slice(0, showingMoviesCount)
      .forEach((movie) => renderMovie(filmsContainerElement, movie));

      renderLoadMoreButton();
    });

    renderLoadMoreButton();

    for (let i = 0; i < TOP_RATED_MOVIE_CARD_COUNT; i++) {
      renderMovie(topRatedList, movies[2]);
    }

    for (let i = 0; i < MOST_COMMENTED_MOVIE_CARD_COUNT; i++) {
      renderMovie(mostCommentedList, movies[3]);
    }

  }
}
