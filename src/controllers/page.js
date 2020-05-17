
export default class PageController {
  constructor(container) {

    this._container = container;
  }

  render(movies) {

    renderBoard(this._container, movies);
  }
}