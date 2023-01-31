import { useEffect, useState } from 'react';
import type { Film } from '../types/Film';
import { Genre } from '../types/Genre';
import { fetchData } from '../utils/fetchData';
import {
  filmURL,
  genreURL,
  optionGenreURL,
  optionYearURL,
} from '../utils/filmUrlSettings';

interface Options {
  genre: number | null;
  year: number | null;
}

interface Params extends Options {
  setGenres(genres: Genre[]): void;
  setFilms(films: Film[]): void;
  countFilms: number;
  lang: string;
}

export const useLoadFilms = ({
  setGenres,
  setFilms,
  genre,
  year,
  countFilms,
  lang,
}: Params) => {
  const [isLoading, setIsLoading] = useState(false);

  async function getDataFromApi(url: string, key: string, lang: string) {
    setIsLoading(true);

    try {
      const data = await fetchData(url + '&language=' + lang, key);

      setIsLoading(false);

      if (key === 'genres') {
        setGenres(data);
      }

      if (key === 'results') {
        return data;
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function loadFilms(
    num: number = 100,
    options: Options = { genre, year }
  ) {
    const pagesQuantity = num / 20 + 1;
    const addGenre = options.genre ? optionGenreURL + options.genre : '';
    const addYear = options.year ? optionYearURL + options.year : '';
    const complexURL = filmURL + addGenre + addYear;

    const filmsList = [];

    for (let i = 1; i < pagesQuantity; i++) {
      const partOfFilms = await getDataFromApi(
        `${complexURL}&page=${i}`,
        'results',
        lang
      );

      filmsList.push(...partOfFilms);
    }

    setFilms(filmsList);
  }

  useEffect(() => {
    getDataFromApi(genreURL, 'genres', lang);
    loadFilms(countFilms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return { isLoading, loadFilms };
};
