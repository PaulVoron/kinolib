import React, { useState, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Button } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { FilmCard } from '../components/FilmCard';
import '../App.scss';

type Props = {
  // setCurrentMenu: React.Dispatch<React.SetStateAction<string>>,
}

export const RandomPage: React.FC<Props> = () => {
  const lang = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState<Film[]>([]);
  const [filmIndex, setFilmIndex] = useState(0);

  const apiKey = '?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';
  const limiter = '&include_adult=false&include_video=false';
  
  const language = `&language=${lang}`;
  const filmURL = 'discover/movie' + apiKey + limiter + language;
  const backdropURL = '	https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/';

  function getFilm(url: string, key: string) {    
    fetchData(url, key)
      .then(data => {
        setIsLoading(false);
        console.log(url);
        console.log(data);
        setFilms(data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function wait(delay: number) {
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  const handleClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> 
      | React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    rangeRandom: number = 100
  ) => {
    setFilms([]);
    const sortByPopularity = '&sort_by=popularity.desc';
    const randomNumber = Math.floor(Math.random() * rangeRandom) + 1;
    const page = Math.ceil(randomNumber / 20);
    setFilmIndex(randomNumber - (page - 1) * 20 - 1);
    const requestURL = filmURL + sortByPopularity + `&page=${page}`;
    
    setIsLoading(true);
    wait(700).then(() => getFilm(requestURL, 'results'));
  };

  return (
    <>
      <h1>
        {getTranslation('randomPage.title', lang)}
      </h1>

      <Button 
        type="primary"
        icon={<QuestionCircleTwoTone />}
        onClick={(e) => handleClickButton(e, 100)}
      >
        {getTranslation('randomButton.text', lang)}
      </Button>
      
      {isLoading && <Spinner />}

      {films.length !== 0 && 
        <>
          <div 
            className='filmcontainer'
            style={{backgroundImage: `url(${backdropURL 
              + films[filmIndex].backdrop_path})`}}
          >
            <FilmCard index={filmIndex} film={films[filmIndex]} />
          </div>
        </>
      }

    </>
  );
}