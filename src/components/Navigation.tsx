import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { MenuProps, Menu } from 'antd';
import { HomeFilled, QuestionCircleFilled, VideoCameraFilled } from '@ant-design/icons';
import { getActiveLocation } from '../utils/getActiveLocation';

export const Navigation = () => {
  const lang = useContext(LangContext);
  const location = useLocation();
  let activeMenu = getActiveLocation(location.pathname);

  const menuItems: MenuProps['items'] = [
    {
      key: '1', 
      label: (<Link to="/">{getTranslation('nav.title1', lang)}</Link>), 
      icon: <HomeFilled />
    },
    {
      key: '2', 
      label: (<Link to="/films">{getTranslation('nav.title2', lang)}</Link>), 
      icon: <VideoCameraFilled />
    },
    {
      key: '3', 
      label: (<Link to="/random_film">{getTranslation('nav.title3', lang)}</Link>), 
      icon: <QuestionCircleFilled />
    }
  ];

  return (
    <nav style={{ flexGrow:'1' }}>
      <Menu 
        theme="dark"
        style={{backgroundColor: "#0d253f"}}
        mode="horizontal" 
        selectedKeys={[activeMenu]}
        items={menuItems}
      />
    </nav>
  );
}
