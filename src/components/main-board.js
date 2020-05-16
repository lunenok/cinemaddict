import AbstarctComponent from "./abstract-component.js";

export const createMainBoardTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class MainBoard extends AbstarctComponent {
  getTemplate() {
    return createMainBoardTemplate();
  }
}
