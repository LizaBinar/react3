import classes from './btn-next.module.scss';
import PropTypes from 'prop-types';

const BtnNext = ({ onClick }) => {
  return (
    <button onClick={onClick} className={classes['btn-next']}>
      Показать еще 5 билетов!
    </button>
  );
};

BtnNext.propTypes = {
  onClick: PropTypes.func,
};

export default BtnNext;
