import React, { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import TempComp from './TempComp';

// const url = 'discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK&sort_by=popularity.desc&page=1'
// const url = 'discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&sort_by=popularity.desc';
// films.results

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

  async function getDataFromAPI(url: string, key: string, lang: string) {
    console.log(url);
    setIsLoading(true);
    fetchData(url + '&language=' + lang, key)
      .then(data => {
        setIsLoading(false);
        // console.log(data);
        if (key === 'genres' && lang === 'uk-UK') {
          setGenresUk(data);
        } else if (key === 'genres') {
          setGenresEn(data);
        }
        if (key === 'results' && lang === 'uk-UK') {
          setFilmsUk(data);
        } else if (key === 'results') {
          setFilmsEn(data);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }
 
  async function loadData() {
    await getDataFromAPI(filmURL + '&page=1', 'results', 'uk-UK');
    let arr = [...filmsEn];
    console.log('arr = ' + arr);
    await getDataFromAPI(filmURL + '&page=2', 'results', 'uk-UK');
    // arr = arr.push(filmsEn);
    }
  

  useEffect(() => {
    getDataFromAPI(genreURL, 'genres', 'uk-UK');
    getDataFromAPI(genreURL, 'genres', 'en-EN');
    loadData();
    // getDataFromAPI(filmURL + '&page=1', 'results', 'en-EN');
    // console.log(genresUk);
  }, [filmURL, genreURL]);

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

      {filmsUk.length !==0 && <TempComp filmsUk={filmsUk} />}
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
