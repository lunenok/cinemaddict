import AbstractComponent from "./abstract-component.js";
import {userRank} from "../const.js";

export const getUserRank = (films) => {
  const watchedFilms = films.filter((film) => film.isWatched).length;
  let rank = ``;

  if (watchedFilms === 0) {
    rank = ``;
  } else if (watchedFilms >= userRank.novice.minFilmsAmount && watchedFilms <= userRank.novice.maxFilmsAmount) {
    rank = `Novice`;
  } else if (watchedFilms >= userRank.fan.minFilmsAmount && watchedFilms <= userRank.fan.maxFilmsAmount) {
    rank = `Fan`;
  } else if (watchedFilms >= userRank.movieBuff.minFilmsAmount) {
    rank = `Movie Buff`;
  }
  return rank;
};

export default class UserRating extends AbstractComponent {
  constructor(movies) {
    super();

    this._movies = movies;
  }

  getTemplate() {
    const currentUserRank = getUserRank(this._movies);
    return (
      `<p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${currentUserRank}</span>
      </p>`
    );
  }
}
