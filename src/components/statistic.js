import SmartAbstractComponent from "./smart-abstract-component.js";
import UserRatingComponent from "./user-rating.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from "moment";

const filterNames = [`All time`, `Today`, `Week`, `Month`, `Year`];
const DEFAULT_FILTER = `all-time`;

const getFilterIdByName = (filterName) => {
  let filterId = ``;
  filterId = (filterName === `All time`) ? `all-time` : filterName.toLowerCase();
  return filterId;
};

const createFilterMarkup = (filter) => {
  return filterNames
  .map((name) => {
    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${getFilterIdByName(name)}" value="${getFilterIdByName(name)}" ${getFilterIdByName(name) === filter ? `checked` : ``}>
      <label for="statistic-${getFilterIdByName(name)}" class="statistic__filters-label">${name}</label>`
    );
  })
  .join(`\n`);
};

const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

const getTotalMovieDuration = (movies) => {
  let totalDuration = {
    hours: 0,
    minutes: 0,
  };
  const totalMovieDuration = movies.reduce((total, movie) => total + movie.runtime, 0);
  totalDuration.hours = Math.floor(totalMovieDuration / 60);
  totalDuration.minutes = totalMovieDuration % 60;
  return totalDuration;
};

const getMovieGenres = (movies) => {
  return movies.reduce((movieGenres, movie) => {
    movie.genres.forEach((it) => {
      if (!movieGenres.includes(it)) {
        movieGenres.push(it);
      }
    });
    return movieGenres;
  }, []);
};

const getMovieAmountByGenre = (movies) => {
  const movieGenres = getMovieGenres(movies);

  return movieGenres.map((genre) => {
    return {
      genre,
      count: movies.filter((movie) => movie.genres.includes(genre)).length,
    };
  }).sort((a, b) => b.count - a.count);
};

const getMoviesByFilter = (movies, filter) => {
  switch (filter) {
    case `all-time`:
      return movies;
    case `today`:
      return movies.filter((movie) => moment(movie.watchingDate).isSame(moment(), `day`));
    case `week`:
      return movies.filter((movie) => moment(movie.watchingDate).isAfter(moment().subtract(7, `days`)));
    case `month`:
      return movies.filter((movie) => moment(movie.watchingDate).isAfter(moment().subtract(1, `months`)));
    case `year`:
      return movies.filter((movie) => moment(movie.watchingDate).isAfter(moment().subtract(1, `years`)));
  }

  return movies;
};

const renderChart = (genresCtx, movies) => {
  const BAR_HEIGHT = 50;
  const chartData = getMovieAmountByGenre(movies);

  genresCtx.height = BAR_HEIGHT * chartData.length;

  return new Chart(genresCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: chartData.map((it) => it.genre),
      datasets: [{
        data: chartData.map((it) => it.count),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsTemplate = (movies, filter) => {
  const userRaitingComponent = new UserRatingComponent(movies);

  const watchedMovies = getWatchedMovies(movies);
  const filterMarkup = createFilterMarkup(filter);
  const watchedMoviesAmount = getMoviesByFilter(watchedMovies, filter).length;
  const totalMovieDuration = getTotalMovieDuration(getMoviesByFilter(watchedMovies, filter));
  const moviesByGenres = getMovieAmountByGenre(watchedMovies);
  const topGenre = movies.length ? moviesByGenres[0].genre : ``;

  return (`<section class="statistic">

    ${userRaitingComponent.getTemplate()}

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      ${filterMarkup}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMoviesAmount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${totalMovieDuration.hours} <span class="statistic__item-description">h</span> ${totalMovieDuration.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`);
};

export default class Statistic extends SmartAbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
    this._filter = DEFAULT_FILTER;
    this._onFilterChangre();
    this._renderChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies, this._filter);
  }

  recoveryListeners() {
    this._onFilterChangre();
  }

  rerender() {
    super.rerender();

    this._renderChart();
  }

  _renderChart() {
    const genresCtx = this.getElement().querySelector(`.statistic__chart`);
    const movies = getMoviesByFilter(this._movies, this._filter);
    this._resetChart();

    this._chart = renderChart(genresCtx, movies);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }

  _onFilterChangre() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      this._filter = evt.target.value;
      this.rerender();
    });
  }
}
