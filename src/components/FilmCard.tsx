import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { Typography } from 'antd';
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
        <h1>{film?.title}</h1>
        <h4>{getTranslation('card.voteAverage', lang) + ' '} {film?.vote_average}</h4>
        <h4>{getTranslation('card.genre', lang) + ' '} {film?.genre_ids}</h4>
        <h4>{getTranslation('card.releaseDate', lang) + ' '} {film?.release_date}</h4>
        <h4>{getTranslation('card.originalTitle', lang) + ' - '} {film?.original_title}</h4>
        <h4>{getTranslation('card.voteCount', lang) + ' '} {film?.vote_count}</h4>
        <h4>{film?.overview}</h4>
      </div>
    </div>
  );
}
