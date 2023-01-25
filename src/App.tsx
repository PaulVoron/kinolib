import './App.scss';
import { useState } from 'react';
import { LangContext } from './utils/LangContext';
import { Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { RandomPage } from './components/RandomPage';
import { Navigation } from './components/Navigation';
import { LangSelector } from './components/LangSelector';
import { ConfigProvider, Layout, theme, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getActiveLocation } from './utils/getActiveLocation';
import TmdbHeaderLogo from './images/tmdbLogo1.svg';
import TmdbFooterLogo from './images/tmdbLogo2.svg';

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
    <ConfigProvider
    theme={{
      token: {
        "fontSize": 14,
        "colorPrimary": "#01b4e4",
        "colorSuccess": "#90cea1",
        // "colorPrimaryBg": "#0d253f"
      },
    }}
    >

      <LangContext.Provider value={lang}>
        <div className="container" style={{height: "100%"}}>
          <Layout>
            <Header className="header">
              <div 
                className="logo" 
                onClick={handleClickLogo}
              >
                <Link to="/" style={{color: "#90cea1"}}>
                  TOP-FILMS
                </Link>
              </div>
              <Navigation />
              <div className='logo-tmdb'>
                <img src={TmdbHeaderLogo} height={40} alt="TMDB logo" />
              </div>
              <LangSelector lang={lang} setLang={setLang} />
            </Header>

            <Content className='content'>
              <Layout className='content__sider' style={{ background: colorBgContainer }}>
                {activeMenu === '2' &&
                  <Sider style={{ background: colorBgContainer }} width={200}>
                    <Button>TOP 100 FILMS</Button>
                    <Button>TOP 250 FILMS</Button>
                    <Button>TOP 500 FILMS</Button>
                  </Sider>
                }
                <Content className='content__body'>
                  <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/films" element={ <FilmPage />}/>
                    <Route path="/random_film" element={ <RandomPage />}/>
                  </Routes>
                </Content>
              </Layout>
            </Content>
            <Footer className='footer'>
              React * TypeScript * AntDesign * Axios
              <img className='logo-tmdb' src={TmdbFooterLogo} height={20} alt="TMDB logo" />
              TheMovieDB API - 2023 - Created by Paul Voronin
            </Footer>
          </Layout>
        </div>
      </LangContext.Provider>
    </ConfigProvider>
  );
}

export default App;

//*************************************/
      //! npm add react-countup
      //! npm i -g npm 
      //! npm i --save lodash
//*************************************/
