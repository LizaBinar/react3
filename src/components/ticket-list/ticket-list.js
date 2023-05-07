import classes from './ticket-list.module.scss';

import Ticket from '../ticket/ticket';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { performInitialSetup } from '../../redux/reducer';
import BtnNext from '../btn-next/btn-next';
import LoadingAnimation from '../loading-animation/loading-animation';
import LoadingMessage from '../loading-message/loading-message';
import NoResults from '../no-result/no-result';

const getCheckedKeys = (filters) => {
  return Object.keys(filters)
    .filter((key) => filters[key].checked)
    .map((key) => Number(key));
};

const generateLoaders = (countShow) => {
  const loaderArray = Array(countShow).fill(null);

  return loaderArray.map((_, index) => (
    <li className={classes['loader-card']} key={index}>
      <LoadingAnimation />
    </li>
  ));
};

const getLoaders = (tickets, countShow) => {
  if (tickets === 0) {
    return generateLoaders(countShow);
  }
  return null;
};

const generateTickets = (newFilterTickets, countShow) => {
  const ticketsArray = Object.values(newFilterTickets).slice(0, countShow);

  return ticketsArray.map((ticket) => {
    const { id, price, segments, carrier } = ticket;
    return (
      <li key={id}>
        <Ticket price={price} segments={segments} carrier={carrier} />
      </li>
    );
  });
};

const filterTickets = (tickets, stopsFilter) => {
  const filteredTickets = {};

  for (const key in tickets) {
    const ticket = tickets[key];
    const segments = ticket.segments;
    const stopsCount = segments[0].stops.length;

    if (stopsFilter.includes(stopsCount)) {
      filteredTickets[key] = ticket;
    }
  }

  return filteredTickets;
};

const sortByDurationAndPrice = (a, b) => {
  const aDuration = a.segments[0].duration;
  const bDuration = b.segments[0].duration;
  const aPrice = a.price;
  const bPrice = b.price;

  if (aDuration === bDuration) {
    return aPrice - bPrice;
  } else {
    return aDuration - bDuration;
  }
};

const sortByCheapest = (a, b) => a.price - b.price;

const sortByFastest = (a, b) => a.segments[0].duration - b.segments[0].duration;

const sortTickets = (tickets, sort) => {
  switch (sort) {
    case 'cheapest':
      return Object.values(tickets).sort(sortByCheapest);
    case 'fastest':
      return Object.values(tickets).sort(sortByFastest);
    case 'optimal':
      return Object.values(tickets).sort(sortByDurationAndPrice);
    default:
      return Object.values(tickets);
  }
};

const TicketList = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sort);
  const tickets = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const searchStop = useSelector((state) => state.searchStop);

  const [countShow, setCountShow] = useState(5);

  useEffect(() => {
    dispatch(performInitialSetup());
  }, []);

  const stopsFilter = getCheckedKeys(filters);
  const newFilterTickets = filterTickets(tickets, stopsFilter);
  const newSortedTickets = sortTickets(newFilterTickets, sort);

  const makeContent = () => {
    if (stopsFilter.length === 0) {
      return <NoResults />;
    } else {
      return (
        <>
          {getLoaders(Object.values(tickets).length, countShow)}
          {generateTickets(newSortedTickets, countShow)}
        </>
      );
    }
  };

  return (
    <>
      <LoadingMessage searchStop={searchStop} count={Object.values(tickets).length} />
      <ul className={classes['ticket-list']}>{makeContent()}</ul>
      <BtnNext onClick={() => setCountShow((countShow) => countShow + 5)} />
    </>
  );
};

export default TicketList;
