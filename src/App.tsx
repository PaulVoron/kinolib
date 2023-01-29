import './App.scss';
import { useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  ConfigProvider,
  Layout,
  theme,
} from 'antd';

import { LangContext } from './utils/LangContext';

import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { RandomPage } from './components/RandomPage';

import { Film } from './types/Film';
import { useLoadFilms } from './hooks/useLoadFilms';
import { Header } from './components/Header';
import { Sider } from './components/Sider';
import { Footer } from './components/Footer';
import { Genre } from './types/Genre';
import { colorPrimary, colorSuccess } from './utils/colorSettings';

export const App = () => {
  const [lang, setLang] = useState('en-EN'); //uk-UK
  const { Content } = Layout;

  const location = useLocation();
  const showSider = location.pathname === '/films';

  const [films, setFilms] = useState<Film[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [countFilms, setCountFilms] = useState(100);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<number | null>(null);
  const [titleYear, setTitleYear] = useState<number | null>(null);
  const [titleGenre, setTitleGenre] = useState<number | null>(null);

  const { isLoading, loadFilms } = useLoadFilms({
    countFilms,
    genre,
    setFilms,
    setGenres,
    year,
    lang,
  });

  const {token: { colorBgContainer }} = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 14,
          colorPrimary: colorPrimary,
          colorSuccess: colorSuccess,
        },
      }}
    >
      <LangContext.Provider value={lang}>
        <div className="container">
          <Layout>
            <Header lang={lang} setLang={setLang} />
  
            <Content className="content">
              <Layout
                className="content__sider"
                style={{ background: colorBgContainer }}
              >
                {showSider && 
                  <Sider 
                    lang={lang} 
                    isLoading={isLoading} 
                    genres={genres}
                    countFilms={countFilms}
                    year={year}
                    genre={genre}
                    setFilms={setFilms}
                    setCountFilms={setCountFilms}
                    setYear={setYear}
                    setGenre={setGenre}
                    setTitleYear={setTitleYear}
                    setTitleGenre={setTitleGenre}
                    loadFilms={loadFilms}
                  />}

                <Content className="content__body"
                  style={{ background: colorBgContainer, zIndex: 1 }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route
                      path="/films"
                      element={
                        <FilmPage
                          films={films}
                          genres={genres}
                          isLoading={isLoading}
                          countFilms={countFilms}
                          year={titleYear}
                          genre={titleGenre}
                        />
                      }
                    />

                    <Route path="/random_film" element={<RandomPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Content>
              </Layout>
            </Content>

            <Footer />
          </Layout>
        </div>
      </LangContext.Provider>
    </ConfigProvider>
  );
};
