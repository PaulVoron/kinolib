import { useContext } from 'react';
import { Rate } from 'antd';
import { HeartFilled, HeartOutlined, StarFilled} from '@ant-design/icons';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import '../App.scss';

type Props = {
  index: number,
  film: Film | null,
}

const posterURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

export const FilmCard: React.FC<Props> = ({ index, film }) => {
  const lang = useContext(LangContext);

  return (
    <div className='filmcard'>
      <div className='filmcard__poster'>
        <img 
          src={posterURL + film?.poster_path} 
          style={{
            height: 450,
            objectFit: 'contain',
          }} 
          alt="poster" />
      </div>
      <div className='filmcard__info'>
        <div className='filmcard__title'>{film?.title}</div>
        
        <div className='filmcard__subtitle'>
          <StarFilled style={{ color: "gold"}} /> 
          {' ' + film?.vote_average}
        </div>
          <Rate 
            allowHalf 
            disabled
            count = {10}
            character={<HeartFilled />}
            defaultValue={(film) ? film.vote_average : 0} 
          />
        
        <div className='filmcard__votecount'>
          {getTranslation('card.voteCount', lang) + ' '}
        {film?.vote_count}</div>
        
        <div className='filmcard__text'>
          {getTranslation('card.releaseDate', lang) + ' '}
          {film?.release_date}
        </div>
        
        <div className='filmcard__origtitle'>
          {getTranslation('card.originalTitle', lang) + ' - '}
          {film?.original_title}
        </div>

        <div className='filmcard__text'>
          {getTranslation('card.genre', lang) + ' '} 
          {film?.genre_ids}
        </div>
        
        <div className='filmcard__line'></div>

        <div className='filmcard__text'>
          {film?.overview}
        </div>
      </div>
    </div>
  );
}
