import { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';

type Props = {
  // setCurrentMenu: React.Dispatch<React.SetStateAction<string>>,
}

export const FilmCard: React.FC<Props> = ({  }) => {
  const lang = useContext(LangContext);

  return (
    <>
      
    </>
  );
}
