import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Button, Space, Typography } from 'antd';
import { VideoCameraFilled, QuestionCircleFilled } from '@ant-design/icons';
import MainPic from '../images/film.png';

export const HomePage = () => {
  const lang = useContext(LangContext);
  const { Title, Text } = Typography;

  return (
    <div className='main'>
      <div className='main__text-wripper'>
        <Title>
          {getTranslation('homePage.title', lang)}
        </Title>

        <Space direction="vertical">
          <Text className='main_text'>
            Це сайт допоможе тобі підібрати фільм за власними уподобаннями серед найпопулярніших. 
            <br />
            Ти можеш переглядати перелік популярних фільмів за окремим жанром, або конкретного року.
            <br />
            Натискай скоріше!
          </Text>
          
          <Link to="/films">
            <Button 
              className='main_button'
              type="primary"
              size='large'
              icon={<VideoCameraFilled />}
              >
              {getTranslation('nav.title2', lang)}
            </Button>
          </Link>

          <Text className='main_text'>
            Або дозволь зробити вибір мені!
            <br />
            Я сам оберу тобі фільм серед сотні найпопулярніших на даний момент!
            <br />
            Насолоджуйся!
          </Text>

          <Link to="/random_film">
            <Button 
              className='main_button'
              type="primary"
              size='large'
              icon={<QuestionCircleFilled />}
              >
              {getTranslation('nav.title3', lang)}
            </Button>
          </Link>
        </Space>
      </div>

      <img 
        className='main__pic'
        src={MainPic}
        alt="filmtyper" 
      />
    </div>
  );
}
