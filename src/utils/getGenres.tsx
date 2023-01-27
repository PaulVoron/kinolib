export function getGenres(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch {
    return [];
  }
}
