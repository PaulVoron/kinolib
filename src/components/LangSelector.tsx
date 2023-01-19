import React from 'react';
import { Select } from 'antd';

type Props = {
  lang: string,
  setLang: React.Dispatch<React.SetStateAction<string>>,
}

export const LangSelector: React.FC<Props> = ({lang, setLang}) => {
  return (
    <Select
      defaultValue={lang}
      style={{ margin:'auto' }}
      onChange={(value) => setLang(value)}
      options={[
        {value: 'en-EN', label: 'Engish'},
        {value: 'uk-UK', label: 'Українська'},
      ]}
    />
  );
}
