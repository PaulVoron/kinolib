import { Genre } from '../types/Genre';

export const genresOptions = (genres: Genre[]) => {
  const options = genres.map(genre => {
    const option: any = {};
    option.value = genre.id;
    option.label = genre.name;
    return option;
  });

  return options;
};
