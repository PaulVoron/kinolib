import './App.css';
import React, { useState, useEffect } from 'react';
import { LangContext } from './utils/LangContext';
import { MenuContext } from './utils/MenuContext';
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { Navigation } from './components/Navigation';
import { Spinner } from './components/Spinner';
import { LangSelector } from './components/LangSelector';
import { MenuProps, Layout, Menu, theme } from 'antd';
import { FunnelPlotTwoTone , QuestionCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getTranslation } from './utils/getTranslation';
import axios, { AxiosError } from 'axios';
import { fetchData } from './utils/fetchData';
import { Genre } from './types/Genre';
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
const genreURL = 'genre/movie/list?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';

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
  const [isLoading, setIsLoading] = useState(false);
  let genres: Genre[] = [];
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
  async function getGenres(url: string) {
    const baseURL =  "https://api.themoviedb.org/3/";
    try {
      setIsLoading(true);
      const response = await axios.get<Genre[]>(
        baseURL + url + `&language=${lang}`
      );
      genres = response.data;
      console.log(genres);
      setIsLoading(false);
    } 
    catch (e: unknown) {
      const error = e as AxiosError;
      setIsLoading(false);
      alert(error.message);

    }
  }


  useEffect(() => {
    setIsLoading(true);
    fetchData(genreURL + `&language=${lang}`, 'genres').then(data => {
      genres = data;
      setIsLoading(false);
      console.log(genres);
    })
      .catch((error) => {
        setIsLoading(false);
        alert(error.message);
      });
  }, [lang]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClickLogo = () => {
    setCurrentMenu('1');
  };

  return (
    <LangContext.Provider value={lang}>
      <MenuContext.Provider value={currentMenu}>
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

              <Navigation setCurrentMenu={setCurrentMenu} />
              <LangSelector lang={lang} setLang={setLang} />
            </Header>

            <Content style={{ padding: '0 50px',}}>
              <Layout style={{ padding: '24px 0', background: colorBgContainer, minHeight: 'calc(100vh - 131px)' }}>
              {isLoading && <Spinner />}
                {currentMenu !== '1' &&
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
                    <Route path="/" element={<HomePage setCurrentMenu={setCurrentMenu} />}/>
                    <Route path="/films" element={ <FilmPage />}/>
                  </Routes>
                </Content>
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center', width: '100%'}}>
              React * TypeScript * AntDesign * TheMovieDbAPI - 2023 - Created by Paul Voronin
            </Footer>
          </Layout>
        </div>
      </MenuContext.Provider>
    </LangContext.Provider>
  );
}

export default App;



//****************************************************************/

//****************************************************************/
