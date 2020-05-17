import {getRandomBoolean, getRandomIntegerNumber, getRandomElement, generateRandomDate} from "../utils/common.js";

const DESCRIPTION_COUNT = 5;

const Movies = [
  `Made for each other`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Sagebrush trail`,
  `Santa Claus Conquers the Martians`,
  `The Dance of Life`,
  `The Great Flamarion`,
  `The Man with the Golden Arm`
];

const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const Descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const Genres = [
  [`Comedy`, `Horror`],
  [`Drama`, `Thriller`],
  [`Adventure`],
  [`History`, `Adventure`],
  [`Musical`, `History`]
];

const CommentText = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `One of the best films`
];

const generateDescription = () => {
  return Descriptions
  .filter(() => getRandomBoolean())
  .slice(0, getRandomIntegerNumber(1, DESCRIPTION_COUNT))
  .join(` `);
};

const generateComment = () => {
  return {
    author: `Ilya O'Reilly`,
    text: getRandomElement(CommentText),
    date: `2019-05-11T16:12:32.554Z`,
    emotion: `smile`
  };
};

const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(generateComment());
  }
  return comments;
};

const generateUserDetails = () => {
  const isWatched = getRandomBoolean();
  const watchDate = isWatched ? generateRandomDate(new Date(2019, 0, 1), new Date()) : null;

  return {
    watchlist: getRandomBoolean(),
    alreadyWatched: isWatched,
    watchingDate: watchDate,
    favorite: getRandomBoolean()
  };
};

const generateMovie = () => {
  const index = getRandomIntegerNumber(0, 6);
  return {
    title: Movies[index],
    poster: Posters[index],
    rating: getRandomIntegerNumber(1, 10),
    ageRating: getRandomIntegerNumber(14, 18),
    director: `Tom Ford`,
    writers: [`Takeshi Kitano`, `Edward Norton`],
    actors: [`Morgan Freeman`, `Clint Eastwood`],
    realeseDate: getRandomIntegerNumber(1940, 1999),
    realeseCountry: `USA`,
    runtime: getRandomIntegerNumber(70, 130),
    genres: getRandomElement(Genres),
    description: generateDescription(),
    commentsCount: 3,
    comments: generateComments(3),
    userDetails: generateUserDetails()
  };
};

export const generateMovies = (count) => {
  const movies = [];
  for (let i = 0; i < count; i++) {
    movies.push(generateMovie());
  }
  return movies;
};
