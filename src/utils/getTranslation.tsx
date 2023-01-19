const translation: Record<string, Record<string, string>> = {
  'en-EN': {
    'homepage.title': 'Welcome!',
    'nav.title1': 'Introduction',
    'nav.title2': 'Top 100 films',
    'nav.title3': 'Random film',
    'filmPage.title': 'Top Films',
  },
  'uk-UK': {
    'homepage.title': 'Вітаємо!',
    'nav.title1': 'Про сайт',
    'nav.title2': 'Top 100 фільмів',
    'nav.title3': 'Випадковий фільм',
    'filmPage.title': 'Кращі фільми',
  }
};

export const getTranslation = (text: string, lang: string) => {
  return translation[lang][text];
};
