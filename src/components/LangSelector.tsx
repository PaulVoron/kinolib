import React from 'react';

type Props = {
  lang: string,
  setLang: React.Dispatch<React.SetStateAction<string>>,
}

export const LangSelector: React.FC<Props> = ({lang, setLang}) => {
  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
    >
      <option value="en-En">English</option>
      <option value="uk-Uk">Українська</option>
    </select>
  );
}
