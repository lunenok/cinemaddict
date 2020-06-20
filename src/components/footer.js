import AbstarctComponent from "./abstract-component.js";

export const createFooterStatisticTemplate = (movies) => {
  const movieCount = movies.length;
  return (
    `<p>${movieCount} movies inside</p>`
  );
};

export default class FooterStatisticComponent extends AbstarctComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this._movies);
  }
}
