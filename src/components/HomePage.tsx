import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Button } from 'antd';
import { VideoCameraFilled } from '@ant-design/icons';

export const HomePage = () => {
  const lang = useContext(LangContext);

  return (
    <>
      <h1>
        {getTranslation('homePage.title', lang)}
      </h1>
      <Link to="/films">
        <Button 
          type="primary"
          icon={<VideoCameraFilled />}
        >
          {getTranslation('nav.title2', lang)}
        </Button>
      </Link>
    </>
  );
}
