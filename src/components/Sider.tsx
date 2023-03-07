import { SearchOutlined } from '@ant-design/icons';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import dayjs from 'dayjs';
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Layout,
  Radio,
  RadioChangeEvent,
  Select,
} from 'antd';
import { useState } from 'react';
import { Genre } from '../types/Genre';
import { genresOptions } from '../utils/genresOptions';
import { getTranslation } from '../utils/getTranslation';
import { Film } from '../types/Film';
import classNames from 'classnames';

const options = [
  { label: '100', value: 100 },
  { label: '300', value: 300 },
  { label: '500', value: 500 },
];

type Props = {
  lang: string;
  isLoading: boolean;
  genres: Genre[];
  countFilms: number;
  year: number | null;
  genre: number | null;
  films: Film[];
  setFoundFilms: React.Dispatch<React.SetStateAction<Film[]>>;
  setCountFilms: React.Dispatch<React.SetStateAction<number>>;
  setTitleCountFilms: React.Dispatch<React.SetStateAction<number>>;
  setYear: React.Dispatch<React.SetStateAction<number | null>>;
  setGenre: React.Dispatch<React.SetStateAction<number | null>>;
  setTitleYear: React.Dispatch<React.SetStateAction<number | null>>;
  setTitleGenre: React.Dispatch<React.SetStateAction<number | null>>;
  loadFilms: (
    num?: number,
    options?: { genre: number | null; year: number | null }
  ) => Promise<void>;
  setIsInSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Sider: React.FC<Props> = ({
  lang,
  isLoading,
  genres,
  countFilms,
  year,
  genre,
  films,
  setFoundFilms,
  setCountFilms,
  setTitleCountFilms,
  setYear,
  setGenre,
  setTitleYear,
  setTitleGenre,
  loadFilms,
  setIsInSearch,
}) => {
  const { Sider } = Layout;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { Search } = Input;
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [inputYearValue, setInputYearValue] = useState<dayjs.Dayjs | null>(
    null
  );
  const [inputGenreValue, setInputGenreValue] = useState<number | null>(null);

  const handleRadioButton = ({ target: { value } }: RadioChangeEvent) => {
    setCountFilms(value);
  };

  const handleYearChange = (value: dayjs.Dayjs | null): void => {
    value && setYear(value.get('year'));
    setInputYearValue(value);
  };

  const handlerSelectGenre = (value: number) => {
    setGenre(value);
    setInputGenreValue(value);
  };

  const handleSubmitButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    loadFilms(countFilms);
    setTitleCountFilms(countFilms);
    setTitleYear(year);
    setTitleGenre(genre);
  };

  const handleResetButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setYear(null);
    setGenre(null);
    setTitleYear(null);
    setTitleGenre(null);
    setInputYearValue(null);
    setInputGenreValue(null);
    setInputSearchValue('');
    loadFilms(countFilms, { genre: null, year: null });
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };

  const onSearch = (value: string) => {
    if (value === '') {
      setIsInSearch(false);
      loadFilms(countFilms);
    } else {
      setIsInSearch(true);
      searchFilm(value);
    }
  };

  const searchFilm = (searchText: string) => {
    const searchPrm = isChecked ? 'overview' : 'title';

    const filteredFilms = [...films].filter(
      film =>
        film[searchPrm].toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );

    setFoundFilms(filteredFilms);
  };

  return (
    <Sider
      className="sider"
      width={200}
      collapsible
      collapsed={isCollapsed}
      onCollapse={value => setIsCollapsed(value)}
    >
      <div
        className={classNames('sider__container', {
          'sider__container--collapsed': isCollapsed,
        })}
      >
        <div className="sider__title">
          {getTranslation('sider.radio.title', lang)}
        </div>

        <Radio.Group
          className="sider__radio"
          options={options}
          onChange={handleRadioButton}
          value={countFilms}
          optionType="button"
        />

        <div className="sider__title">
          {getTranslation('sider.datepicker.title', lang)}
        </div>

        <div className="sider__datepicker" id="datepicker">
          <DatePicker
            className="sider__item"
            placeholder={getTranslation('sider.year.placeholder', lang)}
            value={inputYearValue}
            onChange={handleYearChange}
            picker="year"
          />
        </div>

        <div className="sider__title">
          {getTranslation('sider.select.title', lang)}
        </div>

        <Select
          className="sider__item"
          showSearch
          placeholder={getTranslation('sider.select.placeholder', lang)}
          optionFilterProp="children"
          value={inputGenreValue}
          onChange={handlerSelectGenre}
          getPopupContainer={trigger => trigger.parentElement}
          filterOption={(input, option) =>
            ((option?.label ?? '') as string)
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={genresOptions(genres)}
        />

        <Button
          className="sider__item"
          type="primary"
          loading={isLoading}
          icon={<SearchOutlined />}
          onClick={e => handleSubmitButton(e)}
        >
          {getTranslation('sider.form.button', lang)}
        </Button>

        <Button
          className="sider__item"
          type="default"
          onClick={e => handleResetButton(e)}
        >
          {getTranslation('sider.form.buttonReset', lang)}
        </Button>

        <div className="sider__divider"></div>

        <div className="sider__title">
          {getTranslation('sider.search.title1', lang)}
        </div>

        <Search
          className="sider__item"
          placeholder={getTranslation('sider.search.placeholder', lang)}
          onSearch={onSearch}
          value={inputSearchValue}
          onChange={e => setInputSearchValue(e.target.value)}
          enterButton
          loading={isLoading}
          allowClear
        />

        <Checkbox
          onChange={onCheckboxChange}
          style={{
            fontSize: '12px',
            color: 'white',
          }}
          checked={isChecked}
        >
          {getTranslation('sider.form.checkbox', lang)}
        </Checkbox>
      </div>
    </Sider>
  );
};
