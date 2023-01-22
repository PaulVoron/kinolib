import './App.css';
import { useState } from 'react';
import { LangContext } from './utils/LangContext';
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { RandomPage } from './components/RandomPage';
import { Navigation } from './components/Navigation';
import { LangSelector } from './components/LangSelector';
import { Layout, theme, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getActiveLocation } from './utils/getActiveLocation';

const { Header, Content, Footer, Sider } = Layout;

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
                    <Button>sdfasdfgadfgad f</Button>
                    <Button>sdfasdfgadfgad f</Button>
                    <Button>sdfasdfgadfgad f</Button>
                    <Button>sdfasdfgadfgad f</Button>
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

//! npm i -g npm 
//! npm i --save lodash
//****************************************************************/
