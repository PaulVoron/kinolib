import { Grid } from 'react-loader-spinner';
import '../App.scss';
import { colorPrimary } from '../utils/colorSettings';

export const Spinner = () => {
  return (
    <Grid
      height="120"
      width="120"
      color={colorPrimary}
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperClass="spinner-wrapper"
      visible={true}
    />
  );
}
