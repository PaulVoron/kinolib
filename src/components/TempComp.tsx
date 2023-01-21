import React from 'react';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';


type Props = {
  films: Film[] | null,
}

const TempComp: React.FC<Props> = ({ films }) => {
  if (films) {

    console.log(films.length);
    for (let i = 0; i < films.length; i++) {
      console.log(films[i].title);
    }
  }

  return (
    <div>
      
    </div>
  );
};

export default TempComp;