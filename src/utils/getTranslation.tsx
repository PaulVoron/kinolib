const translation = {
  'en-En': {
    'homePage.title': 'Home Page',
  },
  'uk-Uk': {
    'homePage.title': 'Домашня сторінка',
  }
};

export const getTranslation = (text: string, lang: string) => {
  return translation[lang][text];
};
