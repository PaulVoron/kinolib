import './App.css';
import React, { useState } from 'react';
import { LangContext } from './utils/LangContext';
import { MenuContext } from './utils/MenuContext';
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { Navigation } from './components/Navigation';
import { LangSelector } from './components/LangSelector';
import { MenuProps, Layout, Menu, theme } from 'antd';
import { FunnelPlotTwoTone , QuestionCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getTranslation } from './utils/getTranslation';
// import { Button } from 'antd';
// import { Spinner } from './components/Spinner';
// import { getTranslation } from './utils/getTranslation';
// import { Film } from './types/Film';

// const url = 'https://jsonplaceholder.typicode.com/todos/';
// const url = 'https://api.themoviedb.org/3/movie/1550?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK';
// const url = 'https://api.themoviedb.org/3/discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK&sort_by=popularity.desc&page=1'
// const url = 'https://api.themoviedb.org/3/discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&sort_by=popularity.desc';
// films.results
// genre.genres
const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK';

const { Header, Content, Footer, Sider } = Layout;


const sidemenuItems: MenuProps['items'] = [QuestionCircleTwoTone, FunnelPlotTwoTone].map(
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

function App() {
  const [lang, setLang] = useState('uk-UK'); //en-EN
  const [currentMenu, setCurrentMenu] = useState('1');
  // const [films, setFilms] = useState<Film[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

  // async function fetchData(lang: string) {
  //   const res = await fetch(url + `&language=${lang}`);
  //   res
  //     .json()
  //     .then(data => {
  //       setIsLoading(false);
  //       setFilms(data.results);
  //       console.log(data.genres);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //       alert('Cannot load data from server');
  //     });
  // };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchData();
  // }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LangContext.Provider value={lang}>
      <MenuContext.Provider value={currentMenu}>
        <div className="container" style={{height: "100%"}}>
          <Layout>
            <Header className="header" style={{ display:'flex', position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
              <div className="logo" style={{ padding: '0 42px', color: 'white', fontSize:'24px' }}>
                <Link 
                  to="/"
                >
                  TOP-FILMS
                </Link>
              </div>

              <Navigation setCurrentMenu={setCurrentMenu} />
              <LangSelector lang={lang} setLang={setLang} />
            </Header>

            <Content style={{ padding: '0 50px',}}>
              <Layout style={{ padding: '24px 0', background: colorBgContainer, minHeight: 'calc(100vh - 131px)' }}>
                <Sider style={{ background: colorBgContainer }} width={200}>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub4']}
                    style={{ height: '100%' }}
                    items={sidemenuItems}
                  />
                </Sider>

                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Routes>
                    <Route path="/" element={ <HomePage setCurrentMenu={setCurrentMenu} />}/>
                    <Route path="/films" element={ <FilmPage />}/>
                  </Routes>
                </Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', width: '100%'}}>
              React * TypeScript * AntDesign * Axios * TheMovieDbAPI - 2023 - Created by Paul Voronin
            </Footer>
          </Layout>
        </div>
      </MenuContext.Provider>
    </LangContext.Provider>
  );
}

export default App;



//****************************************************************/
//! Need to add spinner - npm install react-loader-spinner --save
//! Need to add SASS - npm i sass
//****************************************************************/
