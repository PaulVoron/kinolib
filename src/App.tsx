import './App.css';
import { useState } from 'react';
import { LangContext } from './utils/LangContext';
import { Button } from 'antd';
import { LangSelector } from './components/LangSelector';
import { HomePage } from './components/HomePage';

function App() {
  const [lang, setLang] = useState('en-En');
  return (
    <LangContext.Provider value={lang}>
      <div className="App">
        <h1>Test</h1>
        <LangSelector lang={lang} setLang={setLang} />
        <br />
        <HomePage />
        <Button type="primary">Press me</Button>
      </div>
    </LangContext.Provider>
  );
}

export default App;
