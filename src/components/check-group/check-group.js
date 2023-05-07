import Checkbox from 'react-custom-checkbox';
import variables from './check-group.module.scss';
import classes from './check-group.module.scss';
import checkSvg from './check.svg';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../redux/actions';

function checkFilterAll(obj) {
  const array = Object.values(obj);
  let i;
  for (i = 0; i < array.length; i++) {
    if (array[i].checked === false) {
      return false;
    }
  }
  return true;
}

const CheckGroup = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const onChangeCheckBox = (key, status) => {
    if (!status) {
      dispatch(add(key));
    } else {
      dispatch(remove(key));
    }
  };

  const elements = () => {
    const array = Object.values(filters);
    const copy = [...array];
    return copy.map(({ key, title, checked }) => {
      return (
        <label key={key} className={classes['check-group__place']} onClick={onChangeCheckBox.bind(this, key, checked)}>
          <Checkbox
            borderColor={variables.colorBorder}
            checked={checked}
            disabled
            className={classes['check-group__box']}
            icon={<img src={checkSvg} alt="check" />}
            size={20}
          />
          <p>{title}</p>
        </label>
      );
    });
  };

  const all = () => {
    return checkFilterAll(filters);
  };

  const onAllChange = (status) => {
    if (status) {
      Object.keys(filters).forEach((key) => {
        dispatch(add(key));
      });
    } else {
      Object.keys(filters).forEach((key) => {
        dispatch(remove(key));
      });
    }
  };

  const ElementAll = () => {
    return (
      <label key={'all'} className={classes['check-group__place']}>
        <Checkbox
          borderColor={variables.colorBorder}
          onChange={onAllChange}
          checked={all()}
          className={classes['check-group__box']}
          icon={<img src={checkSvg} alt="check" />}
          size={20}
        />
        <p>{'Все'}</p>
      </label>
    );
  };

  return (
    <div className={classes['check-group']}>
      <ElementAll />
      {elements()}
    </div>
  );
};

export default CheckGroup;
