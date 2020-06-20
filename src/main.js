import ProfileComponent from "./components/profile.js";
import MenuController from "./controllers/filter.js";
import MainBoardComponent from "./components/main-board.js";
import PageController from "./controllers/page.js";
import MoviesModel from "./models/movie.js";
import Statistic from "./components/statistic";
import FooterStatisticComponent from "./components/footer";
import {generateMovies} from "./mock/mock.js";
import {render, RenderPosition} from "./utils/render.js";

const Movies = generateMovies(100);

const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatisticElement = document.querySelector(`.footer__statistics`);
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
const statisticController = new Statistic(moviesModel.getAllMovies());
render(siteMainElement, statisticController, RenderPosition.BEFOREEND);
const footerStatisticComponent = new FooterStatisticComponent(moviesModel.getAllMovies());
render(siteFooterStatisticElement, footerStatisticComponent, RenderPosition.BEFOREEND);

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
