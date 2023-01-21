import React from 'react';
import { Genre } from '../types/Genre';
import { Film } from '../types/Film';


type Props = {
  filmsUk: Film[] | null,
}

const TempComp: React.FC<Props> = ({ filmsUk }) => {
  if (filmsUk) {
    // console.log(filmsUk);
    // console.log(filmsUk[0].title);
    // console.log(filmsUk);
  }

  return (
    <div>
      
    </div>
  );
};

export default TempComp;