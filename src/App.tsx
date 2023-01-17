import './App.css';
import { useState } from 'react';
import { LangContext } from './utils/LangContext';
import { Button } from 'antd';
import { LangSelector } from './components/LangSelector';
import { HomePage } from './components/HomePage';
import { Spinner } from './components/Spinner';
import { getTranslation } from './utils/getTranslation';
import { Data } from './types/Data';

// const url = 'https://jsonplaceholder.typicode.com/todos/';
// const url = 'https://api.themoviedb.org/3/movie/1550?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK';
// const url = 'https://api.themoviedb.org/3/discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&language=uk-UK&sort_by=popularity.desc&page=1'
const url = 'https://api.themoviedb.org/3/discover/movie?api_key=a912f6cd4d0573f728f2dba5b8aa1f6c&sort_by=popularity.desc';

function App() {
  const [lang, setLang] = useState('en-En');
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(lang: string) {
    const res = await fetch(url + `&language=${lang}`);
    res
      .json()
      .then(data => {
        setIsLoading(false);
        setData(data.results);
        console.log(data.results);
      })
      .catch(() => {
        setIsLoading(false);
        alert('Cannot load data from server');
      });
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchData();
  // }, []);

  const handleClick = () => {
    setIsLoading(true);
    fetchData(lang);
    // setData([]);
  };

  return (
    <LangContext.Provider value={lang}>
      <div className="App">
        <>
        <h1>Test</h1>
        
        <LangSelector lang={lang} setLang={setLang} />
        <br />
        
        <HomePage />
        
        <Button 
          type="primary"
          onClick={handleClick}
        >
           {getTranslation('homepage.buttonTitle', lang)}
        </Button>
        <br />
        {isLoading && <Spinner />}
        {data.length !== 0 && <span>{data[0].overview}</span>}
        </>
      </div>
    </LangContext.Provider>
  );
}

export default App;

//****************************************************************/
//! Need to add spinner - npm install react-loader-spinner --save
//! Need to add SASS - npm i sass
//****************************************************************/
