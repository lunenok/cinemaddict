import SortingComponent, {SortType} from "./../components/sorting.js";
import FilmsListComponent from "./../components/film-list.js";
import TopRatedFilmsListComponent from "./../components/top-rated-list.js";
import MostCommentedFilmsListComponent from "./../components/most-commented-list.js";
import ShowMoreButtonComponent from "./../components/show-more-button.js";
import NoFilmsComponent from "./../components/no-films.js";
import {render, RenderPosition, remove} from "./../utils/render.js";
import MovieController from "./../controllers/movie.js";

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

const renderMovies = (container, movies, from, to, onDataChange) => {
  movies.slice(from, to).map((movie) => {
    const movieController = new MovieController(container, onDataChange);
    movieController.render(movie);
  });
};

export default class PageController {
  constructor(container) {
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsListComponent = new TopRatedFilmsListComponent();
    this._mostCommentedFilmsListComponent = new MostCommentedFilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent();
    this._movies = [];

    this._onDataChange = this._onDataChange.bind(this);

    this._container = container;
  }

  render(movies) {
    this._movies = movies;
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

    renderMovies(filmsContainerElement, this._movies, 0, showingMoviesCount, this._onDataChange);

    const renderLoadMoreButton = () => {
      if (showingMoviesCount >= this._movies.length) {
        return;
      }

      render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevMoviesCount = showingMoviesCount;
        showingMoviesCount = showingMoviesCount + MOVIE_CARD_COUNT;

        const sortedMovies = getSortedMovies(this._movies, this._sortingComponent.getSortType());
        renderMovies(filmsContainerElement, sortedMovies, prevMoviesCount, showingMoviesCount, this._onDataChange);

        if (showingMoviesCount >= this._movies.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      showingMoviesCount = MOVIE_CARD_COUNT;
      const sortedMovies = getSortedMovies(this._movies, sortType);

      filmsContainerElement.innerHTML = ``;

      renderMovies(filmsContainerElement, sortedMovies, 0, showingMoviesCount, this._onDataChange);

      renderLoadMoreButton();
    });

    renderLoadMoreButton();

    for (let i = 0; i < TOP_RATED_MOVIE_CARD_COUNT; i++) {
      const movieController = new MovieController(topRatedList);
      movieController.render(this._movies[2]);
    }

    for (let i = 0; i < MOST_COMMENTED_MOVIE_CARD_COUNT; i++) {
      const movieController = new MovieController(mostCommentedList);
      movieController.render(this._movies[1]);
    }

  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._movies.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._movies = [].concat(this._movies.slice(0, index), newData, this._movies.slice(index + 1));

    movieController.render(this._movies[index]);
  }
}
