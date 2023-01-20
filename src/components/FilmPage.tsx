import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';

// const url = 'discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK&sort_by=popularity.desc&page=1'
// const url = 'discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&sort_by=popularity.desc';
// films.results

export function FilmPage() {
  const lang = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [films, setFilms] = useState<Film[]>([]);
  const [popularity, setPopularity] = useState('popularity.desc');
  const [voteAverage, setVoteAverage] = useState('vote_average.desc');
  
  const apiKey = '?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';
  const limiter = '&include_adult=false&include_video=false';
  const genreURL = 'genre/movie/list' + apiKey;
  const language = `&language=${lang}`;
  const filmURL = 'discover/movie' + apiKey + limiter;

  function getDataFromAPI(url: string, key: string) {
    setIsLoading(true);
    fetchData(url, key).then(data => {
      setIsLoading(false);
      console.log(data);
      if (key === 'genres') {
        setGenres(data);
      } else {
        setFilms(data);
      }
    })
      .catch(() => {
        setIsLoading(false);
      });
  }
 
  useEffect(() => {
    const requestURL = genreURL + language;
    getDataFromAPI(requestURL, 'genres');
  }, [lang]);

  return (
    <div>
      <h1>
        {getTranslation('filmPage.title', lang)}
      </h1>

      {isLoading && <Spinner />}

      <h1>
        {(genres.length !== 0) && genres[0].name}
      </h1>

      {/* {isLoading && <Spinner />}
      {error && <ErrorMessage error={error} />} */}

      {/* {products.map(product => (
        <Product
          key={product.id}
          product={product}
        />
      ))} */}
    </div>
  );
}
