import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';

type Props = {
  index: number,
  film: Film | null,
}

const imgUrl='https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

export const FilmCard: React.FC<Props> = ({ index, film }) => {
  const lang = useContext(LangContext);

  return (
    <>
      <h4>{'index = '} {index}</h4>

      <h4>{getTranslation('card.title', lang) + ' '} {film?.title}</h4>
      <h4>{getTranslation('card.originalTitle', lang) + ' '} {film?.original_title}</h4>
      <h4>{getTranslation('card.releaseDate', lang) + ' '} {film?.release_date}</h4>
      <h4>{getTranslation('card.overview', lang) + ' '} {film?.overview}</h4>
      <h4>{getTranslation('card.genre', lang) + ' '} {film?.genre_ids}</h4>
      <h4>{getTranslation('card.voteCount', lang) + ' '} {film?.vote_count}</h4>
      <h4>{getTranslation('card.voteAverage', lang) + ' '} {film?.vote_average}</h4>
    </>
  );
}
