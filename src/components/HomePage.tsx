import React, { useContext } from 'react';
import { LangContext } from '../utils/LangContext';

export const HomePage = () => {
  const lang = useContext(LangContext);

  const renderSwitch = (lang: string) => {
    switch(lang) {
      case 'en-En':
        return 'English page';
      case 'uk-Uk':
        return 'Українська сторінка';
    }
  }

  return (
    <h1>
      {renderSwitch(lang)}
    </h1>
  );
}
