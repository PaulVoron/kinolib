import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { 
  Button, 
  FloatButton, 
  Space, 
  Typography 
} from 'antd';
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
          <Text className='main__text'>
            {getTranslation('homePage.text1', lang)}
            <br />
            {getTranslation('homePage.text2', lang)}
            <br />
            {getTranslation('homePage.text3', lang)}
          </Text>
          
          <Link to="/films">
            <Button 
              className='main__button'
              type="primary"
              size='large'
              icon={<VideoCameraFilled />}
              >
              {getTranslation('nav.title2', lang)}
            </Button>
          </Link>

          <Text className='main__text'>
            {getTranslation('homePage.text4', lang)}
            <br />
            {getTranslation('homePage.text5', lang)}
            <br />
            {getTranslation('homePage.text6', lang)}
          </Text>

          <Link to="/random_film">
            <Button 
              className='main__button'
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

        <FloatButton.BackTop 
          style={{marginRight: "-16px"}}
        />
    </div>
  );
}
