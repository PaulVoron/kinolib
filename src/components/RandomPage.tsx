import React, { 
  useState, 
  useContext, 
  useEffect 
} from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { 
  Button, 
  FloatButton, 
  Typography 
} from 'antd';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Film } from '../types/Film';
import { FilmCard } from '../components/FilmCard';
import '../App.scss';
import { backdropURL, filmURL } from '../utils/filmUrlSettings';

export const RandomPage = () => {
  const lang = useContext(LangContext);
  const [isLoading, setIsLoading] = useState(false);
  const [films, setFilms] = useState<Film[]>([]);
  const [filmIndex, setFilmIndex] = useState(0);
  const [requestUrl, setRequestUrl] = useState('');

  const { Title } = Typography;

  function getFilm(url: string, lang: string) {
    const language = `&language=${lang}`;
    fetchData(url + language, 'results')
      .then(data => {
        setFilms(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleClickButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    rangeRandom: number = 100
  ) => {
    const sortByPopularity = '&sort_by=popularity.desc';
    const randomNumber = Math.floor(Math.random() * rangeRandom) + 1;
    const page = Math.ceil(randomNumber / 20);
    const requestURL = filmURL + sortByPopularity + `&page=${page}`;

    setRequestUrl(requestURL);
    setFilmIndex(randomNumber - (page - 1) * 20 - 1);
    setFilms([]);
    setIsLoading(true);
    getFilm(requestURL, lang);
  };

  useEffect(() => {
    if (!requestUrl) {
      return;
    }
    getFilm(requestUrl, lang);
  }, [lang, requestUrl]);

  return (
    <>
      <Title>{getTranslation('randomPage.title', lang)}</Title>

      <Button
        type="primary"
        loading={isLoading}
        icon={<QuestionCircleFilled />}
        onClick={e => handleClickButton(e, 100)}
      >
        {getTranslation('randomButton.text', lang)}
      </Button>

      {isLoading && <Spinner />}

      {films.length !== 0 && (
        <div
          className="filmcontainer"
          style={{
            backgroundImage: `url(${
              backdropURL + films[filmIndex].backdrop_path
            })`,
          }}
        >
          <FilmCard film={films[filmIndex]} className={'filmcard'} />
        </div>
      )}

      <FloatButton.BackTop 
        style={{marginRight: "-16px"}}
      />
    </>
  );
};
