import React, { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';

export const HomePage = () => {
  const lang = useContext(LangContext);

  return (
    <h1>
      {getTranslation('homepage.title', lang)}
    </h1>
  );
}
