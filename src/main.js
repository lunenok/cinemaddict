import ProfileComponent from "./components/profile.js";
import MenuController from "./controllers/filter.js";
import MainBoardComponent from "./components/main-board.js";
import PageController from "./controllers/page.js";
import MoviesModel from "./models/movie.js";
import Statistic from "./components/statistic";
import {generateMovies} from "./mock/mock.js";
import {render, RenderPosition} from "./utils/render.js";

const Movies = generateMovies(15);

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`.main`);
const mainBoardComponent = new MainBoardComponent();
const profileComponent = new ProfileComponent();

render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, mainBoardComponent, RenderPosition.BEFOREEND);

const moviesModel = new MoviesModel();
moviesModel.setMovies(Movies);
const menuController = new MenuController(siteMainElement, moviesModel);
menuController.render();
const pageController = new PageController(mainBoardComponent, moviesModel);
pageController.render();
const statisticController = new Statistic();
render(siteMainElement, statisticController, RenderPosition.BEFOREEND);

statisticController.hide();

menuController.setOnMenuItemClick((item) => {
  if (item === `statisic`) {
    statisticController.show();
    pageController.hide();
  } else {
    statisticController.hide();
    pageController.show();
  }
});


