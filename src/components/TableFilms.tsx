import React, { useContext } from 'react';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { getTranslation } from '../utils/getTranslation';
import { Table, Tag  } from 'antd';
import { LangContext } from '../utils/LangContext';

type Props = {
  genres: Genre[] | undefined,
  films: Film[] | undefined,
}


export const TableFilms: React.FC<Props> = ({ genres, films }) => {
  const lang = useContext(LangContext);
  // const posterURL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
  const posterURL = 'https://www.themoviedb.org/t/p/w130_and_h195_bestv2/';
  console.log(genres);
  
  const columns = [
    // {
    //   title: '#',
    //   dataIndex: 'popularity',
    //   key: 'number',
    // },
    {
      title: getTranslation('table.poster', lang),
      dataIndex: 'poster_path',
      key: 'poster',
      render: (imgUrl: string) => (
        <div>
          <img src={posterURL + imgUrl} alt="poster" />
        </div>
      ),
    },
    {
      title: getTranslation('table.title', lang),
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <span style={{ fontSize: '16px', fontWeight: 'bold'}}>{text}</span>,
    },
    {
      title: getTranslation('table.year', lang),
      dataIndex: 'release_date',
      key: 'year',
      render: (text: string) => <>{text.substring(0, 4)}</>,
    },
    {
      title: getTranslation('table.genres', lang),
      dataIndex: 'genre_ids',
      key: 'genres',
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
            let color = genre.length > 5 ? 'geekblue' : 'green';

            return (
              <Tag color={color} key={genreId}>
                {genre.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: getTranslation('table.rating', lang),
      dataIndex: 'vote_average',
      key: 'rating',
    },
    {
      title: getTranslation('table.count', lang),
      dataIndex: 'vote_count',
      key: 'count',
    },
  ];
  
  return (
    <div>
      <Table dataSource={films} columns={columns} />
    </div>
  );
};
