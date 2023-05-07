import classes from './buttons.module.scss';
import variables from './buttons.module.scss';

import { ConfigProvider, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeSort } from '../../redux/actions';

const options = [
  {
    label: <p className={classes.button}>Самый дешевый</p>,
    value: 'cheapest',
  },
  {
    label: <p className={classes.button}>Самый быстрый</p>,
    value: 'fastest',
  },
  {
    label: <p className={classes.button}>Оптимальный</p>,
    value: 'optimal',
  },
];

const Buttons = () => {
  const dispath = useDispatch();
  const sort = useSelector((state) => state.sort);

  const onChange = ({ target }) => {
    const { value } = target;
    dispath(changeSort(value));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 41,
          padding: 0,
          colorBorder: variables.colorBorder,
          colorPrimary: variables.colorPrimary,
          colorPrimaryHover: variables.colorPrimaryHover,
          borderRadius: 5,
        },
      }}
    >
      <Radio.Group
        className={classes.buttons}
        size={'large'}
        options={options}
        onChange={onChange}
        value={sort}
        optionType="button"
        buttonStyle={'solid'}
      />
    </ConfigProvider>
  );
};

export default Buttons;
