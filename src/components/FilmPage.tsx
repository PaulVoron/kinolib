import React, { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Spinner } from './Spinner';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { Typography, Row, Col, FloatButton } from 'antd';
import { TableFilms } from './TableFilms';

const { Title } = Typography;

type Props = {
  filmsToTable: Film[];
  genres: Genre[];
  isLoading: boolean;
  countFilms: number;
  year: number | null;
  genre: number | null;
};

export const FilmPage: React.FC<Props> = React.memo(
  ({ filmsToTable, genres, isLoading, countFilms, year, genre }) => {
    const lang = useContext(LangContext);
    const targetGenre = genres.find(item => item.id === genre)?.name;

    return (
      <div>
        <Title>
          <>
            TOP
            <span style={{ color: '#01b4e4' }}> {countFilms} </span>
            {getTranslation('filmPage.title', lang)}
            {year && lang === 'uk-UK' ? (
              <>
                <span style={{ color: '#01b4e4' }}> {year}</span> року
              </>
            ) : (
              ''
            )}
            {year && lang === 'en-EN' ? (
              <>
                {' '}
                of
                <span style={{ color: '#01b4e4' }}> {year}</span>
              </>
            ) : (
              ''
            )}
            {genre && lang === 'uk-UK' ? (
              <>
                <br /> Жанр:
                <span style={{ color: '#01b4e4' }}> {targetGenre}</span>
              </>
            ) : (
              ''
            )}
            {genre && lang === 'en-EN' ? (
              <>
                <br /> Genre:
                <span style={{ color: '#01b4e4' }}> {targetGenre}</span>
              </>
            ) : (
              ''
            )}
          </>
        </Title>

        {isLoading && <Spinner />}

        <Row>
          <Col xs={24} md={24}>
            <TableFilms genres={genres} films={filmsToTable} />
          </Col>
        </Row>

        <FloatButton.BackTop />
      </div>
    );
  }
);
