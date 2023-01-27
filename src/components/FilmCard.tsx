import { useContext } from 'react';
import { Rate, Tag } from 'antd';
import { HeartFilled, StarFilled} from '@ant-design/icons';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Film } from '../types/Film';
import { genreColor } from '../utils/genreColor';
import '../App.scss';
import { getGenres } from '../utils/getGenres';

type Props = {
  film: Film | null,
  className: string,
}

const posterURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

export const FilmCard: React.FC<Props> = ({ film, className }) => {
  const lang = useContext(LangContext);
  const genresUk = getGenres("genresUk");
  const genresEn = getGenres("genresEn");

  return (
    <>
      {film && ( 
        <div className={className}>
          <div className={`${className}__poster`}>
            <img 
              src={posterURL + film.poster_path} 
              className={`${className}__poster`}
              alt="poster" 
            />
          </div>
          <div className={`${className}__info`}>
            <div className={`${className}__title`}>{film.title}</div>
            
            <div className={`${className}__rate`}>
              <div className={`${className}__subtitle`}>
                <StarFilled style={{ color: "gold"}} /> 
                {' ' + film.vote_average}
              </div>

              <Rate 
                className={`${className}__hearts`}
                allowHalf 
                disabled
                count = {10}
                character={<HeartFilled />}
                defaultValue={(film) ? film.vote_average : 0} 
              />
            </div>
            
            <div className={`${className}__wrapper`}>
              <div className={`${className}__votecount`}>
                {getTranslation('card.voteCount', lang) + ' '}
              {film.vote_count}</div>
              
              <div className={`${className}__text`}>
                {getTranslation('card.releaseDate', lang) + ' '}
                {film.release_date}
              </div>
            </div>
            
            <div className={`${className}__origtitle`}>
              {getTranslation('card.originalTitle', lang) + ' - '}
              {film.original_title}
            </div>

            <div className={`${className}__text ${className}__genre` }>
              <div className={`${className}__genre_title`}>
                {getTranslation('card.genre', lang) + ': '} 
              </div>

              <div className={`${className}__genre_list`}>
                {film.genre_ids.map((genreId: number) => {
                  let genre = '';

                    const genres = (lang === 'uk-UK') ? genresUk : genresEn;
                    for (let i = 0; i < genres.length; i++) {
                      if (genres[i].id === genreId) {
                        genre = genres[i].name;
                        break;
                      }
                    }

                  let color = genreColor.find(elem => elem.id === genreId)?.color;

                  return (
                    <Tag color={color} key={genreId}>
                      {genre.toUpperCase()}
                    </Tag>
                  );
                })}
              </div>
            </div>
            
            <div className={`${className}__line`}></div>

            <div className={`${className}__text`}>
              {film.overview}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
