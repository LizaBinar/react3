import classes from './ticket.module.scss';
import MyImg from '../my-img/my-img';
import PropTypes from 'prop-types';
import Column from './column/column';

const insertSpace = (number) => {
  const str = number.toString();
  let result = '';

  for (let i = str.length - 1; i >= 0; i--) {
    result = str[i] + result;
    if ((str.length - i) % 3 === 0 && i !== 0) {
      result = ' ' + result;
    }
  }

  return result;
};

const makeColumn = (segment) => {
  const { origin, destination, date, duration, stops } = segment;
  return <Column origin={origin} destination={destination} date={date} duration={duration} stops={stops} />;
};

const Ticket = ({ price, segments, carrier }) => {
  return (
    <div className={classes.ticket}>
      <div className={classes.ticket__header}>
        <div className={classes.ticket__price}>{insertSpace(price)} Р</div>
        <MyImg width={120} src={`https://pics.avs.io/99/36/${carrier}.png`} className={classes.ticket__logo} />
      </div>
      <div className={classes.ticket__info}>
        {makeColumn(segments[0])}
        {makeColumn(segments[1])}
      </div>
    </div>
  );
};

Ticket.propTypes = {
  price: PropTypes.number,
  segments: PropTypes.array,
  carrier: PropTypes.string,
};

export default Ticket;
