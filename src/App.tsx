import './App.css';
import { useState } from 'react';
import { LangContext } from "./utils/LangContext";
import { Button } from 'antd';

function App() {
  const [lang, setLang] = useState('en-En');
  return (
    <LangContext.Provider value={lang}>
      <div className="App">
        <h1>Test</h1>      
        <Button type="primary">Press me</Button>
      </div>
    </LangContext.Provider>
  );
}

export default App;
