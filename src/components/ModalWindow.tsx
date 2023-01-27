import React from 'react';
import { Modal } from 'antd';
import { FilmCard } from './FilmCard';
import { Film } from '../types/Film';

type Props = {
  film: Film | undefined, 
  onIsModalOpen: boolean, 
  onHandleCloseModal: any,
}

export const ModalWindow: React.FC<Props> = (
    {
      film, 
      onIsModalOpen, 
      onHandleCloseModal
    } 
) => {
  return (
    <>
      {film && (
        <Modal 
          bodyStyle={{}}
          open={onIsModalOpen} 
          onCancel={onHandleCloseModal}
          footer={null}
        >
          <FilmCard film={film} className={'modal'} />
        </Modal>
      )}
    </>
  );
};
