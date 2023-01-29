export const apiKey = '?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';
export const limiter = '&include_adult=false&include_video=false';
export const genreURL = `genre/movie/list${apiKey}`;
export const optionYearURL = '&primary_release_year=';
export const optionGenreURL = '&with_genres=';
export const defaultSort = '&sort_by=popularity.desc';
export const filmURL = `discover/movie${apiKey}${limiter}${defaultSort}`;
