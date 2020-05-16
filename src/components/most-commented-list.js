import AbstarctComponent from "./abstract-component.js";

export const createMostCommentedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container">
      </div>
    </section>
    `
  );
};

export default class MostCommentedFilmsList extends AbstarctComponent {
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }
}
