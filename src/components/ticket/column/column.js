import classes from '../ticket.module.scss';
import PropTypes from 'prop-types';

const formatTransfers = (number) => {
  if (number === 1) {
    return '1 пересадка';
  } else if (number === 0) {
    return '0 пересадок';
  } else {
    return `${number} пересадки`;
  }
};

const formatFlightTimes = (departureTime, durationMinutes) => {
  const departureDate = new Date(departureTime);
  const arrivalDate = new Date(departureDate.getTime() + durationMinutes * 60000);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const departureTimeFormatted = formatTime(departureDate);
  const arrivalTimeFormatted = formatTime(arrivalDate);

  return `${departureTimeFormatted} - ${arrivalTimeFormatted}`;
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}ч ${mins}м`;
};

const Column = ({ origin, destination, date, duration, stops }) => {
  return (
    <div className={classes.ticket__segment}>
      <div className={classes.ticket__cell}>
        <p>{`${origin} - ${destination}`}</p>
        <div>{formatFlightTimes(date, duration)}</div>
      </div>
      <div className={classes.ticket__cell}>
        <p>В пути</p>
        <div>{formatTime(duration)}</div>
      </div>
      <div className={classes.ticket__cell}>
        <p>{formatTransfers(stops.length)}</p>
        <div>{stops.join(', ')}</div>
      </div>
    </div>
  );
};

Column.propTypes = {
  origin: PropTypes.string,
  destination: PropTypes.string,
  date: PropTypes.string,
  duration: PropTypes.number,
  stops: PropTypes.array,
};

export default Column;
