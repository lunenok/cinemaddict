import AbstarctComponent from "./abstract-component.js";

export const createTopRatedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra films-list--top">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class TopRatedFilmsList extends AbstarctComponent {
  getTemplate() {
    return createTopRatedFilmsListTemplate();
  }
}
