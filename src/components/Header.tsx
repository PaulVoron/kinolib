import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import TmdbHeaderLogo from '../images/tmdbLogo1.svg';
import { Layout, Select } from 'antd';

type Props = {
  lang: string,
  setLang: React.Dispatch<React.SetStateAction<string>>,
};

export const Header: React.FC<Props> = ({ lang, setLang }) =>{
  const { Header } = Layout;
  
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
  <Header className="header">
    <div className="logo" onClick={handleClickLogo}>
      <Link to="/" style={{ color: '#90cea1' }}>
        TOP-FILMS
      </Link>
    </div>

    <Navigation />

    <div className="logotmdb">
      <img src={TmdbHeaderLogo} height={40} alt="TMDB logo" />
    </div>

    <Select
      className="lang_selector"
      defaultValue={lang}
      style={{ margin:'auto' }}
      onChange={(value) => setLang(value)}
      options={[
        {value: 'en-EN', label: 'Engish'},
        {value: 'uk-UK', label: 'Українська'},
      ]}
    />
  </Header>
  );
}





