import './App.scss';
import { useEffect, useState } from 'react';
import { 
  Route, 
  Routes, 
  useLocation, 
  Link 
} from 'react-router-dom'
import { 
  ConfigProvider, 
  Layout, 
  theme, 
  Button, 
  RadioChangeEvent,
  Radio,
  DatePicker,
  Form,
  Select
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { fetchData } from './utils/fetchData';
import { useLocalStorage } from './utils/useLocalStorage';
import { getActiveLocation } from './utils/getActiveLocation';
import { LangContext } from './utils/LangContext';

import { LangSelector } from './components/LangSelector';
import { HomePage } from './components/HomePage';
import { FilmPage } from './components/FilmPage';
import { RandomPage } from './components/RandomPage';
import { Navigation } from './components/Navigation';

import TmdbHeaderLogo from './images/tmdbLogo1.svg';
import TmdbFooterLogo from './images/tmdbLogo2.svg';

import { Film } from './types/Film';
import { getTranslation } from './utils/getTranslation';
import dayjs from 'dayjs';
import { Genre } from './types/Genre';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

export const App = () => {
  const [lang, setLang] = useState('uk-UK'); //en-EN
  const { Header, Content, Footer, Sider } = Layout;
  const {token: { colorBgContainer }} = theme.useToken();

  const handleClickLogo = () => { activeMenu = '1' };

  const location = useLocation();
  let activeMenu = getActiveLocation(location.pathname);

  const [filmsUk, setFilmsUk] = useState<Film[]>([]);
  const [filmsEn, setFilmsEn] = useState<Film[]>([]);
  const [genresUk, setGenresUk] = useLocalStorage("genresUk", []);
  const [genresEn, setGenresEn] = useLocalStorage("genresEn", []);
  const [isLoading, setIsLoading] = useState(false);
  const [countFilms, setCountFilms] = useState(100);
  const [year, setYear] = useState<number | null>(null);
  const [form] = Form.useForm();

  const apiKey = '?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c';
  const limiter = '&include_adult=false&include_video=false';
  const genreURL = `genre/movie/list${apiKey}`;
  const defaultSort = '&sort_by=popularity.desc';
  const filmURL = `discover/movie${apiKey}${limiter}${defaultSort}`;
  
  let filmsToTableUk: Film[] = [];
  let filmsToTableEn: Film[] = [];

  async function getDataFromApi(url: string, key: string, lang: string) {
    setIsLoading(true);
    fetchData(url + '&language=' + lang, key)
      .then(data => {
        setIsLoading(false);
        if (key === 'genres' && lang === 'uk-UK') {
          setGenresUk(data);
        } else if (key === 'genres') {
          setGenresEn(data);
        }
        if (key === 'results' && lang === 'uk-UK') {
          setFilmsUk((current) => current.concat(data));
        } else if (key === 'results') {
          setFilmsEn((current) => current.concat(data));
        }
      })
      .catch(() => {
        setIsLoading(false);
      }
    );
  }

  async function loadFilms(num: number = 100) {
    const pagesQuantity = num / 20 + 1;

    for (let i = 1; i < pagesQuantity; i++) {
      await getDataFromApi(`${filmURL}&page=${i}`, 'results', 'uk-UK');
      await getDataFromApi(`${filmURL}&page=${i}`, 'results', 'en-EN');
    }
  }
  
  function copySortMakeUniq (arr: Film[]) {
    const newArr = arr.sort((a: Film, b: Film) => a.id - b.id)
    .reduce((arr: Film[], el: Film) => {
      if(!arr.length || arr[arr.length - 1].id !== el.id) {
        arr.push(el);
      }
      return arr;
    }, []);
    
    return newArr.sort((a: Film, b: Film) => b.popularity - a.popularity);
  }
  
  const options = [
    { label: '100', value: 100 },
    { label: '300', value: 300 },
    { label: '500', value: 500 },
  ];

  const handleRadioButton = ({ target: { value } }: RadioChangeEvent) => {
    setFilmsUk([]);
    setFilmsEn([]);
    setCountFilms(value);
    loadFilms(value);
  };

  //! ======================================================================
  const genresOptions = (genres: Genre[]) => {
    const options = genres.map(genre => {
      const option: any = {};
      option.value = genre.id;
      option.label = genre.name;
      return option;
    });

    return options;
  };

  const handleDateChange = (value: dayjs.Dayjs | null): void => {
    value && setYear(value.get('year'));
  }

  const handlerSelectGenre = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const handlerSearchGenre = (value: string) => {
    console.log('search:', value);
  };

  const handleSubmitButton = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> 
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    form.resetFields();
  };

  //! ======================================================================
  
  useEffect(() => {
    getDataFromApi(genreURL, 'genres', 'uk-UK');
    getDataFromApi(genreURL, 'genres', 'en-EN')
    loadFilms(countFilms);
  }, []);
    
  filmsToTableUk = copySortMakeUniq(filmsUk);
  filmsToTableEn = copySortMakeUniq(filmsEn);

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
              <Layout
                className='content__sider' 
                style={{ background: colorBgContainer }}
              >
                {activeMenu === '2' &&
                  <Sider 
                    className='sider'
                    style={{ background: colorBgContainer }} 
                    width={200}
                  >
                    <div className='sider__container'>
                      <div className='sider__title'>
                        {getTranslation('sider.radio.title', lang)}
                      </div>

                      <Radio.Group
                        className='sider__radio'
                        options={options}
                        onChange={handleRadioButton}
                        value={countFilms}
                        optionType="button"
                        buttonStyle="solid"
                      />

                      <div className='sider__divider'></div>

                      <Form
                        form={form}
                        name="form"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          name="yearFilm"
                        >
                          <div className='sider__title'>
                            {getTranslation('sider.datepicker.title', lang)}
                          </div>

                          <DatePicker
                            className='sider__item'
                            placeholder={getTranslation('sider.year.placeholder', lang)}
                            onChange={handleDateChange} 
                            picker="year" 
                          />
                        </Form.Item>

                        <Form.Item
                          name="genreFilm"
                        >
                          <div className='sider__title'>
                            {getTranslation('sider.datepicker.title', lang)}
                          </div>
                          
                          <Select
                            className='sider__item'
                            showSearch
                            placeholder={getTranslation('sider.select.placeholder', lang)}
                            optionFilterProp="children"
                            onChange={handlerSelectGenre}
                            onSearch={handlerSearchGenre}
                            filterOption={(input, option) =>
                              (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            options={(lang === 'uk-UK') 
                              ? genresOptions(genresUk)
                              : genresOptions(genresEn)
                            }
                          />
                        </Form.Item>

                        <Form.Item>
                          <Button 
                            className='sider__item'
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                            icon={<SearchOutlined />}
                            onClick={(e) => handleSubmitButton(e)}
                          >
                            {getTranslation('sider.form.button', lang)}
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Sider>
                }
                <Content className='content__body'>
                  <Routes>
                    <Route path="/" element={<HomePage />}/>

                    <Route 
                      path="/films" 
                      element={ <FilmPage 
                        filmsToTableUk={filmsToTableUk}
                        filmsToTableEn={filmsToTableEn}
                        genresUk={genresUk}
                        genresEn={genresEn}
                        isLoading={isLoading}
                        countFilms={countFilms}
                      />}
                    />

                    <Route path="/random_film" element={ <RandomPage />}/>
                  </Routes>
                </Content>
              </Layout>
            </Content>

            <Footer className='footer'>
              React * TypeScript * AntDesign * Axios
              <img 
                className='logo-tmdb' 
                src={TmdbFooterLogo} 
                height={20} 
                alt="TMDB logo" 
              />
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
