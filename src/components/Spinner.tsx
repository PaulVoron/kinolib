import { Grid } from 'react-loader-spinner';
import '../styles/Spinner.scss';

export const Spinner = () => {
  return (
    <div className='spinner-wrapper'>
      <Grid
        height="80"
        width="80"
        color="#1677ff"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperClass="spinner-wrapper"
        visible={true}
      />
    </div>
  );
}
