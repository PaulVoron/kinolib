import { RotatingSquare } from 'react-loader-spinner';
import '../styles/Spinner.scss';

export const SpinnerSquare = () => {
  return (
    <div className='spinner-wrapper'>
      <RotatingSquare
        height="100"
        width="100"
        color="#1677ff"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass="spinner-wrapper"
        visible={true}
      />
    </div>
  );
}
