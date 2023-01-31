import { Layout } from 'antd';
import TmdbFooterLogo from '../images/tmdbLogo2.svg';

export const Footer = () => {
  const { Footer } = Layout;

  return (
    <Footer 
      className="footer"
      style={{ 
        background:"#0d253f",
        color: "white",
        fontSize: "12px",
        paddingLeft: "200px"
      }}
    >
      React * TypeScript * AntDesign * Axios
      <img
        className="logotmdb"
        src={TmdbFooterLogo}
        height={12}
        alt="TMDB logo"
      />
      TheMovieDB API - 2023 - Created by Paul Voronin
    </Footer>
  );
}
