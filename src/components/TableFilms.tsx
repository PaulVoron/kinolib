import React, { useContext, useState } from 'react';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';
import { getTranslation } from '../utils/getTranslation';
import { 
  Button, 
  Space, 
  Table, 
  TableProps 
} from 'antd';
import { LangContext } from '../utils/LangContext';

import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ModalWindow } from './ModalWindow';
import { useFilmColumns } from '../hooks/useColumns';
import { posterLargeURL } from '../utils/filmUrlSettings';

type Props = {
  genres: Genre[];
  films: Film[] | undefined;
};
export const TableFilms: React.FC<Props> = ({ genres, films }) => {
  const lang = useContext(LangContext);

  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Film>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modaldata, setmodaldata] = useState<Film | undefined>();

  const columns = useFilmColumns({
    posterURL: posterLargeURL,
    sortedInfo,
    genres,
    filteredInfo,
  });

  const handleChange: TableProps<Film>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<Film>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearSorts = () => {
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
        <Button onClick={clearFilters}>
          {getTranslation('table.button.clearFilter', lang)}
        </Button>
        <Button onClick={clearSorts}>
          {getTranslation('table.button.clearAll', lang)}
        </Button>
      </Space>
      <Table
        rowKey={record => record.id}
        columns={columns}
        expandable={{
          expandedRowRender: record => (
            <>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                {getTranslation('table.annotation', lang)}
              </p>
              <p style={{ margin: 0 }}>{record.overview}</p>
            </>
          ),
          rowExpandable: record => !!record.overview,
        }}
        dataSource={films}
        bordered={true}
        onRow={record => {
          return {
            onClick: () => showModal(record),
          };
        }}
        onChange={handleChange}
      />

      {modaldata && (
        <ModalWindow
          film={modaldata}
          onIsModalOpen={isModalOpen}
          onHandleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
