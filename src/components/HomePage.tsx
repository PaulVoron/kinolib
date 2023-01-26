import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Button, Space, Typography } from 'antd';
import { VideoCameraFilled, QuestionCircleFilled } from '@ant-design/icons';

export const HomePage = () => {
  const lang = useContext(LangContext);
  const { Title } = Typography;

  return (
    <>
      <Title>
        {getTranslation('homePage.title', lang)}
      </Title>
      <Space>
        <Link to="/films">
          <Button 
            type="primary"
            icon={<VideoCameraFilled />}
          >
            {getTranslation('nav.title2', lang)}
          </Button>
        </Link>

        <Link to="/random_film">
          <Button 
            type="primary"
            icon={<QuestionCircleFilled />}
          >
            {getTranslation('nav.title3', lang)}
          </Button>
        </Link>
      </Space>
    </>
  );
}
