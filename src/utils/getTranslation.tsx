const translation: Record<string, Record<string, string>> = {
  'en-En': {
    'homepage.title': 'Home Page',
    'homepage.buttonTitle': 'Load films',
  },
  'uk-Uk': {
    'homepage.title': 'Домашня сторінка',
    'homepage.buttonTitle': 'Завантажити фільми',
  }
};

export const getTranslation = (text: string, lang: string) => {
  return translation[lang][text];
};
