const translation: Record<string, Record<string, string>> = {
  'en-EN': {
    'homePage.title': 'Welcome!',
    'nav.title1': 'Introduction',
    'nav.title2': 'Top 100 films',
    'nav.title3': 'Random film',
    'filmPage.title': 'Top Films',
    'randomPage.title': 'What would we watch today?',
    'randomButton.text': 'Random Film',
  },
  'uk-UK': {
    'homePage.title': 'Вітаємо!',
    'nav.title1': 'Про сайт',
    'nav.title2': 'Top 100 фільмів',
    'nav.title3': 'Випадковий фільм',
    'filmPage.title': 'Кращі фільми',
    'randomPage.title': 'Що подивимось сьогодні?',
    'randomButton.text': 'Випадковий фільм',
  }
};

export const getTranslation = (text: string, lang: string) => {
  return translation[lang][text];
};
