import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../utils/LangContext';
import { MenuContext } from '../utils/MenuContext';
import { getTranslation } from '../utils/getTranslation';
import { MenuProps, Menu } from 'antd';
import { QuestionCircleTwoTone, VideoCameraFilled } from '@ant-design/icons';

type Props = {
  setCurrentMenu: React.Dispatch<React.SetStateAction<string>>,
}

export const Navigation: React.FC<Props> = ({setCurrentMenu}) => {
  const lang = useContext(LangContext);
  const current = useContext(MenuContext);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrentMenu(e.key);
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1', 
      label: (<Link to="/">{getTranslation('nav.title1', lang)}</Link>), 
      icon: <QuestionCircleTwoTone />
    },
    {
      key: '2', 
      label: (<Link to="/films">{getTranslation('nav.title2', lang)}</Link>), 
      icon: <VideoCameraFilled />
    },
    {
      key: '3', 
      label: (<Link to="/random_film">{getTranslation('nav.title3', lang)}</Link>), 
      icon: <QuestionCircleTwoTone />
    }
  ];

  return (
    <nav style={{ flexGrow:'1' }}>
      <Menu 
        theme="dark" //light
        mode="horizontal" 
        selectedKeys={[current]}
        items={menuItems}
        onClick={onClick}
      />
    </nav>
  );
}