import { Grid } from 'react-loader-spinner';
import '../styles/Spinner.scss';

export const Spinner = () => {
  return (
    <Grid
      height="120"
      width="120"
      color="#1677ff"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperClass="spinner-wrapper"
      visible={true}
    />
  );
}
