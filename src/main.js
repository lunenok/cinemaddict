import ProfileComponent from "./components/profile.js";
import MenuComponent from "./components/menu.js";
import MainBoardComponent from "./components/main-board.js";
import PageController from "./controllers/page.js";
import MoviesModel from "./models/movie.js";
import {generateMovies} from "./mock/mock.js";
import {calculateFilters} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";

const Movies = generateMovies(15);
const filtersCount = calculateFilters(Movies);

// Рендер управления и главной доски
const siteHeaderElement = document.querySelector(`header`);
const siteMainElement = document.querySelector(`.main`);
const mainBoardComponent = new MainBoardComponent();
const profileComponent = new ProfileComponent();
const menuComponent = new MenuComponent(filtersCount);

render(siteHeaderElement, profileComponent, RenderPosition.BEFOREEND);
render(siteMainElement, menuComponent, RenderPosition.BEFOREEND);
render(siteMainElement, mainBoardComponent, RenderPosition.BEFOREEND);

const moviesModel = new MoviesModel();
moviesModel.setMovies(Movies);
const pageController = new PageController(mainBoardComponent, moviesModel);
pageController.render();
