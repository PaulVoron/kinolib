import { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Typography } from 'antd';
import MainPic from '../images/film.png';

export const NotFoundPage = () => {
  const lang = useContext(LangContext);
  const { Title } = Typography;

  return (
    <div className='main'>
      <div className='main__text-wripper'>
        <Title>
          {getTranslation('noFoundPage.title', lang)}
        </Title>
      </div>

      <img 
        className='main__pic'
        src={MainPic}
        alt="filmtyper" 
      />
    </div>
  );
}
