import React, { useState, useEffect, useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Spinner } from './Spinner';
import { fetchData } from '../utils/fetchData';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { 
  Typography, 
  Row, 
  Col, 
  FloatButton, 
} from 'antd';
import { TableFilms } from './TableFilms';

const { Title } = Typography;

type Props = {
  filmsToTableUk: Film[],
  filmsToTableEn: Film[],
  genresUk: Genre[],
  genresEn: Genre[],
  isLoading: boolean,
  countFilms: number,
}

export const FilmPage: React.FC<Props> = React.memo(({ 
  filmsToTableUk, 
  filmsToTableEn,
  genresUk,
  genresEn, 
  isLoading,
  countFilms,
}) => {
  const lang = useContext(LangContext);
 
  return (
    <div>
      <Title>
        TOP 
        <span style={{ color: '#01b4e4' }} > {countFilms} </span>
        {getTranslation('filmPage.title', lang)}
      </Title>

      {isLoading && <Spinner />}

      <Row>
        <Col xs={24} md={24}>
          {(lang === 'uk-UK') ? (
            <TableFilms 
              genres={genresUk} 
              films={filmsToTableUk} 
            />
          ):(
            <TableFilms 
              genres={genresEn} 
              films={filmsToTableEn} 
            />
          )}
        </Col>
      </Row>

      <FloatButton.BackTop />
    </div>
  );
});
