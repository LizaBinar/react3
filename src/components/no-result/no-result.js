import { Result } from 'antd';
import classes from './no-result.module.scss';

const NoResults = () => {
  return (
    <div className={classes['no-results-container']}>
      <Result
        status="404"
        title="Рейсов, подходящих под заданные фильтры, не найдено"
        subTitle="Попробуйте изменить фильтры или повторить попытку позже"
      />
    </div>
  );
};

export default NoResults;
