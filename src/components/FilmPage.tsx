import React, { useContext } from 'react';
import { LangContext } from '../utils/LangContext';
import { getTranslation } from '../utils/getTranslation';
import { Spinner } from './Spinner';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { 
  Typography, 
  Row, 
  Col, 
  FloatButton 
} from 'antd';
import { TableFilms } from './TableFilms';
import { colorPrimary } from '../utils/colorSettings';

const { Title } = Typography;

type Props = {
  films: Film[];
  genres: Genre[];
  isLoading: boolean;
  titleCountFilms: number;
  year: number | null;
  genre: number | null;
};

export const FilmPage: React.FC<Props> = React.memo(
  ({ 
    films, 
    genres, 
    isLoading, 
    titleCountFilms, 
    year, 
    genre 
  }) => {
    const lang = useContext(LangContext);
    const targetGenre = genres.find(item => item.id === genre)?.name;

    return (
      <div>
        <Title 
          level={2} 
        >
          <div className='filmapage__title'>
            TOP
            <span style={{ color: colorPrimary }}> {titleCountFilms}</span>
            {getTranslation('filmPage.title', lang)}
          </div>
        </Title>
        
        <Title 
          level={3}
          style={{ marginTop: "-8px" }}
        >
          {year && (
            <>
              {getTranslation('filmPage.year', lang)}
              <span style={{ color: colorPrimary }}> {year}</span>
            </>
          )}

          {genre && (
            <>
              {getTranslation('filmPage.genre', lang)}
              <span style={{ color: colorPrimary }}> {targetGenre}</span>
            </>
          )}
        </Title>

        {isLoading && <Spinner />}

        <Row>
          <Col xs={24} md={24}>
            <TableFilms genres={genres} films={films} />
          </Col>
        </Row>

        <FloatButton.BackTop 
          style={{marginRight: "-16px"}}
        />
      </div>
    );
  }
);
