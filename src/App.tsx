import './App.css';
import React, { useState } from 'react';
import { LangContext } from './utils/LangContext';
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { RandomPage } from './components/RandomPage';
import { Navigation } from './components/Navigation';
import { LangSelector } from './components/LangSelector';
import { MenuProps, Layout, Menu, theme } from 'antd';
import { FunnelPlotTwoTone , QuestionCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getActiveLocation } from './utils/getActiveLocation';

const { Header, Content, Footer, Sider } = Layout;

const sidemenuItems: MenuProps['items'] = [
  QuestionCircleTwoTone, 
  FunnelPlotTwoTone
].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

export const App = () => {
  const [lang, setLang] = useState('uk-UK'); //en-EN
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickLogo = () => {
    activeMenu = '1';
  };

  const location = useLocation();
  let activeMenu = getActiveLocation(location.pathname);

  return (
    <LangContext.Provider value={lang}>
        <div className="container" style={{height: "100%"}}>
          <Layout>
            <Header className="header" style={{ display:'flex', position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
              <div 
                className="logo" 
                style={{ 
                  padding: '0 42px', 
                  fontSize:'24px', 
                  fontWeight: "bold"
                }}
                onClick={handleClickLogo}
              >
                <Link to="/" style={{color: "white"}}>
                  TOP-FILMS
                </Link>
              </div>

              <Navigation />

              <LangSelector lang={lang} setLang={setLang} />
            </Header>

            <Content style={{ padding: '0 50px',}}>
              <Layout style={{ padding: '24px 0', background: colorBgContainer, minHeight: 'calc(100vh - 131px)' }}>
                {activeMenu === '2' &&
                  <Sider style={{ background: colorBgContainer }} width={200}>
                    <Menu
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub4']}
                      style={{ height: '100%' }}
                      items={sidemenuItems}
                    />
                  </Sider>
                }
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/films" element={ <FilmPage />}/>
                    <Route path="/random_film" element={ <RandomPage />}/>
                  </Routes>
                </Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', width: '100%'}}>
              React * TypeScript * AntDesign * Axios * TheMovieDbAPI - 2023 - Created by Paul Voronin
            </Footer>
          </Layout>
        </div>
    </LangContext.Provider>
  );
}

export default App;

//****************************************************************/
//! npm add react-countup
//****************************************************************/
// {id: 28, name: 'Бойовик'}
// {id: 12, name: 'Пригоди'}
// {id: 16, name: 'Мультфільм'}
// {id: 35, name: 'Комедія'}
// {id: 80, name: 'Кримінал'}
// {id: 99, name: 'Документальний'}
// {id: 18, name: 'Драма'}
// {id: 10751, name: 'Сімейний'}
// {id: 14, name: 'Фентезі'}
// {id: 36, name: 'Історичний'}
// {id: 27, name: 'Жахи'}
// {id: 10402, name: 'Музика'}
// {id: 9648, name: 'Детектив'}
// {id: 10749, name: 'Мелодрама'}
// {id: 878, name: 'Фантастика'}
// {id: 10770, name: 'Телефільм'}
// {id: 53, name: 'Трилер'}
// {id: 10752, name: 'Військовий'}
// {id: 37, name: 'Вестерн'}