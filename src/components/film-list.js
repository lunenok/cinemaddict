import AbstarctComponent from "./abstract-component.js";

export const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmsList extends AbstarctComponent {
  getTemplate() {
    return createFilmsListTemplate();
  }
}
