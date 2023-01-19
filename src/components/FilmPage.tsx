import { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { useFilms } from '../utils/films';
import { ModalContext } from '../utils/ModalContext';
// import { Film } from '../types/Film';
import { Spinner } from './Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Modal } from '../components/Modal';

export function FilmPage() {
  const lang = useContext(LangContext);
  const { films, isLoading, error } = useFilms(); //custom hook
  const { modal, openModal, closeModal } = useContext(ModalContext);

  return (
    <div>
      <h1>
        {getTranslation('filmPage.title', lang)}
      </h1>

      {isLoading && <Spinner />}
      {error && <ErrorMessage error={error} />}

      {/* {products.map(product => (
        <Product
          key={product.id}
          product={product}
        />
      ))} */}

      {modal && 
        <Modal
          title="Create new product"
          onClose={closeModal}
        >
          {/* <CreateProduct onCreate={createHandler}/> */}
        </Modal>
      }
    </div>
  );
}
