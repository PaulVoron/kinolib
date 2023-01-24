import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { Film } from '../types/Film';

type Props = {
  modaldata: Film | undefined, 
  onIsModalOpen: boolean, 
  onHandleCloseModal: any,
}

export const ModalWindow: React.FC<Props> = (
    {
      modaldata, 
      onIsModalOpen, 
      onHandleCloseModal
    } 
) => {
  return (
    <Modal 
      bodyStyle={{}}
      title={modaldata?.title} 
      open={onIsModalOpen} 
      onCancel={onHandleCloseModal}
      footer={null}
    >
       <StarFilled style={{ color: "gold"}} />
      <p>{modaldata?.overview}</p>
      <p>Some contents...</p>
    </Modal>
  );
};
