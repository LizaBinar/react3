import classes from './filter.module.scss';
import CheckGroup from '../check-group/check-group';

const Filter = () => {
  return (
    <div className={classes.filters}>
      <h3 className={classes.filters__header}>Количество пересадок</h3>
      <CheckGroup />
    </div>
  );
};

export default Filter;
