import React, { useContext, useState } from 'react';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { getTranslation } from '../utils/getTranslation';
import { Button, Space, Table, TableProps, Tag  } from 'antd';
import { LangContext } from '../utils/LangContext';
import { genreColor } from '../utils/genreColor';

import type { 
  ColumnsType, 
  FilterValue, 
  SorterResult 
} from 'antd/es/table/interface';
import { ModalWindow } from './ModalWindow';

type Props = {
  genres: Genre[],
  films: Film[] | undefined,
}
export const TableFilms: React.FC<Props> = ({ genres, films }) => {
  const lang = useContext(LangContext);
  const posterURL = 'https://www.themoviedb.org/t/p/w130_and_h195_bestv2/';
  
  const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Film>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modaldata, setmodaldata] = useState<Film | undefined>();

  const columns: ColumnsType<Film> = [
    {
      title: getTranslation('table.poster', lang),
      dataIndex: 'poster_path',
      key: 'poster',
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
    },
    {
      title: getTranslation('table.title', lang),
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => 
      <span style={{ fontWeight: 'bold'}}>{text}</span>,
    },
    {
      title: getTranslation('table.year', lang),
      dataIndex: 'release_date',
      key: 'year',
      render: (text: string) => <>{text.substring(0, 4)}</>,
      sorter: (a, b) => Number(a.release_date.substring(0, 4)) 
        - Number(b.release_date.substring(0, 4)),
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'year' ? sortedInfo.order : null,
      ellipsis: true,
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
            let color = genreColor.find(elem => elem.id === genreId)?.color;

            return (
              <Tag color={color} key={genreId}>
                {genre.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: genres.map((item) => ({
        text: item.name,
        value: item.id
      }))
      .sort((a, b) => a.text.localeCompare(b.text)),
      filteredValue: filteredInfo.genres || null,
      onFilter: (value, record) => record.genre_ids.some(item => item === value),
      filterMultiple: false,
    },
    {
      title: getTranslation('table.rating', lang),
      dataIndex: 'vote_average',
      key: 'rating',
      sorter: (a, b) => a.vote_average - b.vote_average,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'rating' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: getTranslation('table.count', lang),
      dataIndex: 'vote_count',
      key: 'count',
      sorter: (a, b) => a.vote_count - b.vote_count,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'count' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: getTranslation('table.popularity', lang),
      dataIndex: 'popularity',
      key: 'popularity',
      sorter: (a, b) => a.popularity - b.popularity,
      sortDirections: ['descend', 'ascend'],
      sortOrder: sortedInfo.columnKey === 'popularity' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  const handleChange: TableProps<Film>['onChange'] = (
    pagination, filters, sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<Film>);
  };
  
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const showModal = (record: Film) => {
    setmodaldata(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>{getTranslation('table.button.clearFilter', lang)}</Button>
        <Button onClick={clearAll}>{getTranslation('table.button.clearAll', lang)}</Button>
      </Space>
      <Table 
        rowKey={(record) => record.id}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              {getTranslation('table.annotation', lang)}
            </p>
            <p style={{ margin: 0 }}>
              {record.overview}
            </p>
            </>
          ),
          rowExpandable: (record) => !!record.overview,
        }}
        dataSource={films}
        bordered={true}
        onRow={(record) => {
          return {
            onClick: () => showModal(record),
          };
        }}
        onChange={handleChange}
      />

      {modaldata &&
      <ModalWindow 
        film={modaldata}
        onIsModalOpen={isModalOpen} 
        onHandleCloseModal={handleCloseModal} />
      }
    </>
  );
};
