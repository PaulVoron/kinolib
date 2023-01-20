import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Button } from 'antd';
import { VideoCameraFilled } from '@ant-design/icons';

type Props = {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>,
}

export const HomePage: React.FC<Props> = ({setCurrentMenu}) => {
  const lang = useContext(LangContext);
  const handleClickButton = () => {
    setCurrentMenu('2');
  };

  return (
    <>
      <h1>
        {getTranslation('homepage.title', lang)}
      </h1>
      <Link to="/films">
        <Button 
          type="primary"
          icon={<VideoCameraFilled />}
          onClick={handleClickButton}
        >
          {getTranslation('nav.title2', lang)}
        </Button>
      </Link>
    </>
  );
}
