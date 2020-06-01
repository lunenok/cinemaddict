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

const getTopRatedMovies = (movies) => {
  return movies.sort((a, b) => b.rating - a.rating);
};

const getMostCommentedMovies = (movies) => {
  return movies.sort((a, b) => b.comments.lenght - a.comments.lenght);
};

const renderMovies = (container, movies, from, to, onDataChange, onViewChange) => {
  return movies.slice(from, to).map((movie) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(movie);

    return movieController;
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._filmsListComponent = new FilmsListComponent();
    this._topRatedFilmsListComponent = new TopRatedFilmsListComponent();
    this._mostCommentedFilmsListComponent = new MostCommentedFilmsListComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortingComponent = new SortingComponent();
    this._showingMoviesCount = MOVIE_CARD_COUNT;
    this._moviesModel = moviesModel;
    this._showedMoviesControllers = [];
    this._filmsContainerElement = this._filmsListComponent.getElement().querySelector(`.films-list__container`);

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
    this._sortingComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    this._container = container;
  }

  render() {
    const movies = this._moviesModel.getMovies();
    const container = this._container.getElement();

    if (movies.length === 0) {
      render(container, new NoFilmsComponent(), RenderPosition.AFTERBEGIN);
      return;
    }

    render(container, this._sortingComponent, RenderPosition.BEFOREEND);
    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._topRatedFilmsListComponent, RenderPosition.BEFOREEND);
    render(container, this._mostCommentedFilmsListComponent, RenderPosition.BEFOREEND);

    const topRatedList = this._topRatedFilmsListComponent.getElement().querySelector(`.films-list__container`);
    const mostCommentedList = this._mostCommentedFilmsListComponent.getElement().querySelector(`.films-list__container`);

    let showingMoviesCount = MOVIE_CARD_COUNT;

    const newMovies = renderMovies(this._filmsContainerElement, movies, 0, showingMoviesCount, this._onDataChange, this._onViewChange);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies); // не работает

    this._renderLoadMoreButton();

    renderMovies(topRatedList, getTopRatedMovies(movies), 0, TOP_RATED_MOVIE_CARD_COUNT, this._onDataChange, this._onViewChange);
    renderMovies(mostCommentedList, getMostCommentedMovies(movies), 0, MOST_COMMENTED_MOVIE_CARD_COUNT, this._onDataChange, this._onViewChange);
  }

  _removeMovies() {
    this._showedMoviesControllers.forEach((movieController) => movieController.destroy());
    this._showedMoviesControllers = [];
  }

  _updateMovies(count) {
    this._removeMovies();
    const newMovies = renderMovies(this._filmsContainerElement, this._moviesModel.getMovies(), 0, count, this._onDataChange, this._onViewChange);
    this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);
    this._renderLoadMoreButton();
  }

  _onFilterChange() {
    this._updateMovies(MOVIE_CARD_COUNT);
  }

  _renderLoadMoreButton() {
    const movies = this._moviesModel.getMovies();
    if (this._showingMoviesCount >= movies.length) {
      remove(this._showMoreButtonComponent);
      return;
    }

    remove(this._showMoreButtonComponent);

    render(this._filmsListComponent.getElement(), this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevMoviesCount = this._showingMoviesCount;
      this._showingMoviesCount = this._showingMoviesCount + MOVIE_CARD_COUNT;

      const sortedMovies = getSortedMovies(movies, this._sortingComponent.getSortType());
      const newMovies = renderMovies(this._filmsContainerElement, sortedMovies, prevMoviesCount, this._showingMoviesCount, this._onDataChange, this._onViewChange);
      this._showedMoviesControllers = this._showedMoviesControllers.concat(newMovies);

      if (this._showingMoviesCount >= movies.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingMoviesCount = MOVIE_CARD_COUNT;
    const sortedMovies = getSortedMovies(this._moviesModel.getMovies(), sortType);

    this._filmsContainerElement.innerHTML = ``;

    const newMovies = renderMovies(this._filmsContainerElement, sortedMovies, 0, this._showingMoviesCount, this._onDataChange, this._onViewChange);
    this._showedMoviesControllers = newMovies;

    this._renderLoadMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedMoviesControllers.forEach((it) => it.setDefaultView());
  }
}
