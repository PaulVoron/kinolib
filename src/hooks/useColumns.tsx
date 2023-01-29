import { Tag } from 'antd';
import {
  ColumnsType,
  FilterValue,
  SorterResult,
} from 'antd/es/table/interface';
import { useContext, useMemo } from 'react';
import { Film } from '../types/Film';
import { Genre } from '../types/Genre';
import { genreColor } from '../utils/genreColor';
import { getTranslation } from '../utils/getTranslation';
import { LangContext } from '../utils/LangContext';

interface Params {
  posterURL: string;
  sortedInfo: SorterResult<Film>;
  genres: Genre[];
  filteredInfo: Record<string, FilterValue | null>;
}

export const useFilmColumns = ({
  sortedInfo,
  posterURL,
  genres,
  filteredInfo,
}: Params) => {
  const lang = useContext(LangContext);

  const columns: ColumnsType<Film> = useMemo(
    () => [
      {
        title: getTranslation('table.poster', lang),
        dataIndex: 'poster_path',
        key: 'poster',
        align: 'center',
        render: (imgUrl: string) => (
          <div>
            <img
              src={posterURL + imgUrl}
              alt="poster"
              style={{
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        ),
        width: '15%',
      },
      {
        title: getTranslation('table.title', lang),
        dataIndex: 'title',
        key: 'title',
        align: 'center',
        render: (text: string) => (
          <span style={{ fontWeight: 'bold' }}>{text}</span>
        ),
      },
      {
        title: getTranslation('table.year', lang),
        dataIndex: 'release_date',
        key: 'year',
        align: 'center',
        render: (text: string) => <>{text.substring(0, 4)}</>,
        sorter: (a, b) =>
          Number(a.release_date.substring(0, 4)) -
          Number(b.release_date.substring(0, 4)),
        sortDirections: ['descend', 'ascend'],
        sortOrder: sortedInfo.columnKey === 'year' ? sortedInfo.order : null,
        ellipsis: true,
        width: '15%',
      },
      {
        title: getTranslation('table.genres', lang),
        dataIndex: 'genre_ids',
        key: 'genres',
        align: 'center',
        render: (_: any, { genre_ids }: any) => (
          <>
            {genre_ids.map((genreId: number) => {
              let genre = '';

              if (genres) {
                for (let i = 0; i < genres.length; i++) {
                  if (genres[i].id === genreId) {
                    genre = genres[i].name;
                    break;
                  }
                }
              }
              let color = genreColor.find(elem => elem.id === genreId)?.color;

              return (
                <Tag 
                  color={color} 
                  key={genreId}
                  style={{margin: '2px'}}
                  >
                  {genre.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
        filters: genres
          .map(item => ({
            text: item.name,
            value: item.id,
          }))
          .sort((a, b) => a.text.localeCompare(b.text)),
        filteredValue: filteredInfo.genres || null,
        onFilter: (value, record) =>
          record.genre_ids.some(item => item === value),
        filterMultiple: false,
        width: '15%',
        responsive: ['lg'],
      },
      {
        title: getTranslation('table.rating', lang),
        dataIndex: 'vote_average',
        key: 'rating',
        align: 'center',
        sorter: (a, b) => a.vote_average - b.vote_average,
        sortDirections: ['descend', 'ascend'],
        sortOrder: sortedInfo.columnKey === 'rating' ? sortedInfo.order : null,
        ellipsis: true,
        width: '15%',
        responsive: ['md'],
      },
      {
        title: getTranslation('table.count', lang),
        dataIndex: 'vote_count',
        key: 'count',
        align: 'center',
        sorter: (a, b) => a.vote_count - b.vote_count,
        sortDirections: ['descend', 'ascend'],
        sortOrder: sortedInfo.columnKey === 'count' ? sortedInfo.order : null,
        ellipsis: true,
        width: '10%',
        responsive: ['xl'],
      },
      {
        title: getTranslation('table.popularity', lang),
        dataIndex: 'popularity',
        key: 'popularity',
        align: 'center',
        sorter: (a, b) => a.popularity - b.popularity,
        sortDirections: ['descend', 'ascend'],
        sortOrder:
          sortedInfo.columnKey === 'popularity' ? sortedInfo.order : null,
        ellipsis: true,
        width: '10%',
        responsive: ['xl'],
      },
    ],
    [sortedInfo, posterURL, genres, filteredInfo, lang]
  );

  return columns;
};
