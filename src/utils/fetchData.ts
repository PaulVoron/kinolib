import axios, { AxiosError } from 'axios';

export async function fetchData(url: string, key: string) {
  const baseURL =  "https://api.themoviedb.org/3/";
  try {
    const response = await axios.get(
      baseURL + url
    );
    return response.data[key];
  } 
  catch (e: unknown) {
    const error = e as AxiosError;
    alert(error.message);
  }
}
