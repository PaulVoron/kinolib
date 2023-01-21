import React, { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import TempComp from './TempComp';

export const FilmPage = React.memo(() => {
  const lang = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(false);
  const [genresUk, setGenresUk] = useState<Genre[]>([]);
  const [genresEn, setGenresEn] = useState<Genre[]>([]);
  const [filmsUk, setFilmsUk] = useState<Film[]>([]);
  const [filmsEn, setFilmsEn] = useState<Film[]>([]);
  const [popularity, setPopularity] = useState('popularity.desc');
  const [voteAverage, setVoteAverage] = useState('vote_average.desc');
  
  const apiKey = '?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';
  const limiter = '&include_adult=false&include_video=false';
  const genreURL = 'genre/movie/list' + apiKey;
  const defaultSort = '&sort_by=popularity.desc';
  const filmURL = 'discover/movie' + apiKey + limiter + defaultSort;

  async function getDataFromApi(url: string, key: string, lang: string) {
    setIsLoading(true);
    fetchData(url + '&language=' + lang, key)
      .then(data => {
        setIsLoading(false);
        if (key === 'genres' && lang === 'uk-UK') {
          setGenresUk(data);
        } else if (key === 'genres') {
          setGenresEn(data);
        }
        if (key === 'results' && lang === 'uk-UK') {
          setFilmsUk((cur) => cur.concat(data));
        } else if (key === 'results') {
          setFilmsEn((cur) => cur.concat(data));
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  async function loadData() {
    getDataFromApi(genreURL, 'genres', 'uk-UK');
    getDataFromApi(genreURL, 'genres', 'en-EN');

    for (let i = 1; i < 6; i++) {
      getDataFromApi(`${filmURL}&page=${i}`, 'results', 'uk-UK');
      getDataFromApi(`${filmURL}&page=${i}`, 'results', 'en-EN');
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>
        {getTranslation('filmPage.title', lang)}
      </h1>

      {isLoading && <Spinner />}

      <h1>
        {(genresUk.length !== 0) && genresUk[0].name}
        {(genresEn.length !== 0) && genresEn[0].name}
      </h1>

      {genresUk.length !==0 && <TempComp films={filmsUk.slice(0, 100)} />}
      {/* {isLoading && <Spinner />}

      {/* {products.map(product => (
        <Product
          key={product.id}
          product={product}
        />
      ))} */}
    </div>
  );
});
