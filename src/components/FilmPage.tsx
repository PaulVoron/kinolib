import { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { fetchData } from '../utils/fetchData';
// import { Film } from '../types/Film';
import { Spinner } from './Spinner';
import { ErrorMessage } from '../components/ErrorMessage';

export function FilmPage() {
  const lang = useContext(LangContext);

  return (
    <div>
      <h1>
        {getTranslation('filmPage.title', lang)}
      </h1>

      {/* {isLoading && <Spinner />}
      {error && <ErrorMessage error={error} />} */}

      {/* {products.map(product => (
        <Product
          key={product.id}
          product={product}
        />
      ))} */}
    </div>
  );
}
