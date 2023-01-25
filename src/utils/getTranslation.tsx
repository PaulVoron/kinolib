const translation: Record<string, Record<string, string>> = {
  'en-EN': {
    'homePage.title': 'Welcome!',
    'nav.title1': 'Introduction',
    'nav.title2': 'Top 100 films',
    'nav.title3': 'Random film',
    'filmPage.title': ' Popular Films',
    'randomPage.title': 'What will we watch today?',
    'randomButton.text': 'Random Film',
    'card.originalTitle': 'Original Title',
    'card.overview': 'Overview',
    'card.releaseDate': 'Release Date',
    'card.title': 'Title',
    'card.voteAverage': 'Vote Average',
    'card.voteCount': 'Vote Count',
    'card.genre': 'Genre',
    'table.popularity': 'Рopularity',
    'table.poster': 'Poster',
    'table.title': 'Title',
    'table.genres': 'Genres',
    'table.rating': 'Rating',
    'table.count': 'Сount',
    'table.year': 'Year',
    'table.button.clearFilter': 'Clear filters',
    'table.button.clearAll': 'Clear filters and sorters',
    'table.annotation': 'About film:',
  },
  'uk-UK': {
    'homePage.title': 'Вітаємо!',
    'nav.title1': 'Про сайт',
    'nav.title2': 'Top 100 фільмів',
    'nav.title3': 'Випадковий фільм',
    'filmPage.title': ' Популярних фільмів',
    'randomPage.title': 'Що подивимось сьогодні?',
    'randomButton.text': 'Випадковий фільм',
    'card.originalTitle': 'Оригінальна назва',
    'card.overview': 'Опис',
    'card.releaseDate': 'Дата релізу',
    'card.title': 'Назва',
    'card.voteAverage': 'Оцінка',
    'card.voteCount': 'Кількість оцінок',
    'card.genre': 'Жанр',
    'table.popularity': 'Полулярність',
    'table.poster': 'Постер',
    'table.title': 'Назва',
    'table.genres': 'Жанри',
    'table.rating': 'Рейтинг',
    'table.count': 'Оцінок',
    'table.year': 'Рік',
    'table.button.clearFilter': 'Скинути фільтри',
    'table.button.clearAll': 'Скинути сортування та фільтри',
    'table.annotation': 'Про фільм:',
  }
};

export const getTranslation = (text: string, lang: string) => {
  return translation[lang][text];
};
