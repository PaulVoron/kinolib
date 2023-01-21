export function getActiveLocation (path: string){
  switch (path) {
    case '/':
      return '1';
    case '/films':
      return '2';
    case '/random_film':
      return '3';
    default:
      return '';
  }
}
