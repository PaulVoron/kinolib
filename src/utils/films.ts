// Это кастомный хук! Со всей логикой из App.
// В результате мы возвращаем в return-е то, что было в state-ах App.
import { useState, useEffect } from 'react';
import { Film } from '../types/Film';
import axios, { AxiosError } from 'axios';

export function useFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await axios.get<Film[]>(
        'https://fakestoreapi.com/products?limit=5'
      );
      // удобство axios - можно в дженерике сразу указать ожидаемый тип данных
      setFilms(response.data);
      setIsLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setIsLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { films, isLoading, error }
}
