import React, { useState, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Button, Typography } from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Film } from '../types/Film';
import { FilmCard } from '../components/FilmCard';
import '../App.scss';



export const RandomPage = () => {
  const lang = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(false);
  const [filmsUk, setFilmsUk] = useState<Film[]>([]);
  const [filmsEn, setFilmsEn] = useState<Film[]>([]);
  const [filmIndex, setFilmIndex] = useState(0);

  const { Title } = Typography;
  
  const apiKey = '?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';
  const limiter = '&include_adult=false&include_video=false';
  const filmURL = 'discover/movie' + apiKey + limiter;
  const backdropURL = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/';

  function getFilm(url: string, key: string, lang: string) {
    const language = `&language=${lang}`;
    fetchData(url + language, key)
      .then(data => {
        setIsLoading(false);
        if (lang === 'uk-UK') {
          setFilmsUk(data);
        } else {
          setFilmsEn(data);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  function wait(delay: number) { // to make an illusion of selection magic :)
    return new Promise(resolve => {
      setTimeout(resolve, delay);
    });
  }

  const handleClickButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> 
      | React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    rangeRandom: number = 100
  ) => {
    const sortByPopularity = '&sort_by=popularity.desc';
    const randomNumber = Math.floor(Math.random() * rangeRandom) + 1;
    const page = Math.ceil(randomNumber / 20);
    const requestURL = filmURL + sortByPopularity + `&page=${page}`;
    
    setFilmIndex(randomNumber - (page - 1) * 20 - 1);
    setFilmsUk([]);
    setFilmsEn([]);
    setIsLoading(true);
    wait(1000)
      .then(() => getFilm(requestURL, 'results', 'uk-UK'))
      .then(() => getFilm(requestURL, 'results', 'en-EN'));
  };
  const films = (lang === 'uk-UK') ? filmsUk : filmsEn;

  return (
    <>
      <Title>
        {getTranslation('randomPage.title', lang)}
      </Title>

      <Button 
        type="primary"
        loading={isLoading}
        icon={<QuestionCircleFilled />}
        onClick={(e) => handleClickButton(e, 100)}
      >
        {getTranslation('randomButton.text', lang)}
      </Button>
      
      {isLoading && <Spinner />}

      {filmsEn.length !==0 &&
        <div 
          className='filmcontainer'
          style={{backgroundImage: `url(${backdropURL 
            + films[filmIndex].backdrop_path})`}}
        >
          <FilmCard film={films[filmIndex]} className={'filmcard'} />
        </div>
      }
    </>
  );
}
