const translation: Record<string, Record<string, string>> = {
  'en-EN': {
    'homePage.title': 'Welcome!',
    'nav.title1': 'Introduction',
    'nav.title2': 'Top 100 films',
    'nav.title3': 'Random film',
    'filmPage.title': 'Top Films',
    'randomPage.title': 'What would we watch today?',
    'randomButton.text': 'Random Film',
    'card.originalTitle': 'Original Title',
    'card.overview': 'Overview',
    'card.releaseDate': 'Release Date',
    'card.title': 'Title',
    'card.voteAverage': 'Vote Average',
    'card.voteCount': 'Vote Count',
    'card.genre': 'Genre',
  },
  'uk-UK': {
    'homePage.title': 'Вітаємо!',
    'nav.title1': 'Про сайт',
    'nav.title2': 'Top 100 фільмів',
    'nav.title3': 'Випадковий фільм',
    'filmPage.title': 'Кращі фільми',
    'randomPage.title': 'Що подивимось сьогодні?',
    'randomButton.text': 'Випадковий фільм',
    'card.originalTitle': 'Оригінальна назва',
    'card.overview': 'Опис',
    'card.releaseDate': 'Дата релізу',
    'card.title': 'Назва',
    'card.voteAverage': 'Оцінка',
    'card.voteCount': 'Кількість оцінок',
    'card.genre': 'Жанр',
  }
};

export const getTranslation = (text: string, lang: string) => {
  return translation[lang][text];
};
