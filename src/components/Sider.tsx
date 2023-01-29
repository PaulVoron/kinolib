import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { 
  Button, 
  DatePicker, 
  Form, 
  Layout, 
  Radio, 
  RadioChangeEvent, 
  Select, 
} from 'antd';
import { useCallback, useState } from 'react';
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
  lang: string,
  isLoading: boolean;
  genres: Genre[],
  countFilms: number,
  year: number | null,
  genre: number | null,
  setFilms: React.Dispatch<React.SetStateAction<Film[]>>,
  setCountFilms: React.Dispatch<React.SetStateAction<number>>,
  setYear: React.Dispatch<React.SetStateAction<number | null>>,
  setGenre: React.Dispatch<React.SetStateAction<number | null>>,
  setTitleYear: React.Dispatch<React.SetStateAction<number | null>>,
  setTitleGenre: React.Dispatch<React.SetStateAction<number | null>>,
  loadFilms: (num?: number) => Promise<void>,
};

export const Sider: React.FC<Props> = ({ 
  lang, 
  isLoading, 
  genres, 
  countFilms,
  year,
  genre,
  setFilms,
  setCountFilms,
  setYear,
  setGenre,
  setTitleYear,
  setTitleGenre,
  loadFilms
}) => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [isUpdBtnDisabled, setIsUpdBtnDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  
  const handleRadioButton = useCallback(
    ({ target: { value } }: RadioChangeEvent) => {
      setCountFilms(value);
      setFilms([]);
      loadFilms(value);
      setTitleYear(null);
      setTitleGenre(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadFilms]
    );

  const handleUpdateButton = useCallback(
    (e:
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setFilms([]);
      loadFilms(countFilms);
      setTitleYear(null);
      setTitleGenre(null);
      setIsUpdBtnDisabled(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadFilms]
    );
    
    const handleDateChange = useCallback((value: dayjs.Dayjs | null): void => {
      value && setYear(value.get('year'));
    }, [setYear]);

  const handlerSelectGenre = useCallback((value: number) => {
    setGenre(value);
  }, [setGenre]);

  const handleSubmitButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setFilms([]);
    loadFilms(countFilms);
    setTitleYear(year);
    setTitleGenre(genre);
  };

  const handleResetButton = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsUpdBtnDisabled(false);
    form.resetFields();
    setYear(null);
    setGenre(null);
    setTitleYear(null);
    setTitleGenre(null);
    setFilms([]);
    loadFilms(countFilms);
  };

  return (
    <Sider
      className="sider"
      width={200}
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
    >
      <div 
        className={classNames(
          'sider__container',
          { 'sider__container--collapsed': collapsed },
        )}
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
          buttonStyle="solid"
        />

        <div className="sider__divider"></div>

        <Form form={form} name="form" autoComplete="off">
          <Form.Item name="yearFilm">
            <>
              <div className="sider__title">
                {getTranslation('sider.datepicker.title', lang)}
              </div>

              <DatePicker
                className="sider__item"
                placeholder={getTranslation(
                  'sider.year.placeholder',
                  lang
                )}
                onChange={handleDateChange}
                picker="year"
              />
            </>
          </Form.Item>

          <Form.Item name="genreFilm">
            <>
              <div className="sider__title">
                {getTranslation('sider.select.title', lang)}
              </div>

              <Select
                className="sider__item"
                showSearch
                placeholder={getTranslation(
                  'sider.select.placeholder',
                  lang
                )}
                optionFilterProp="children"
                onChange={handlerSelectGenre}
                filterOption={(input, option) =>
                  ((option?.label ?? '') as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={genresOptions(genres)}
              />
            </>
          </Form.Item>

          <Form.Item>
            <Button
              className="sider__item"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              icon={<SearchOutlined />}
              onClick={e => handleSubmitButton(e)}
            >
              {getTranslation('sider.form.button', lang)}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              className="sider__item"
              type="default"
              htmlType="reset"
              onClick={e => handleResetButton(e)}
            >
              {getTranslation('sider.form.buttonReset', lang)}
            </Button>
          </Form.Item>
          
          <div className="sider__divider"></div>

          <Button
            className="sider__item"
            type="primary"
            htmlType="submit"
            onClick={e => handleUpdateButton(e)}
            disabled={isUpdBtnDisabled}
          >
            {getTranslation('sider.form.buttonApply', lang)}
          </Button>
        </Form>
      </div>
    </Sider>
  );
}
