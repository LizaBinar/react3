import { fetchSearchId, fetchTickets } from '../api/base';
import { ADD_FILTER, GET_SEARCH_ID, REMOVE_FILTER, CHANGE_SORT, GET_TICKETS } from './tupes';
import { nanoid } from 'nanoid';

const filters = {
  0: { title: 'Без пересадок', key: '0', checked: true },
  1: { title: '1 пересадка', key: '1', checked: false },
  2: { title: '2 пересадки', key: '2', checked: false },
  3: { title: '3 пересадки', key: '3', checked: false },
};

const defaultState = {
  filters: filters,
  sort: 'cheapest', // fastest optimal
  searchId: false,
  searchStop: false,
  tickets: {},
};

export const performInitialSetup = () => {
  return async (dispatch) => {
    try {
      const searchId = await fetchSearchId();
      if (searchId) {
        dispatch(fetchTicketsAndUpdateState(searchId));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const fetchTicketsAndUpdateState = (searchId) => {
  return async (dispatch) => {
    let stop = false;

    const processResponse = (res) => {
      if (res && res.tickets) {
        dispatch({
          type: GET_TICKETS,
          tickets: res.tickets,
          searchStop: res.stop,
        });
        stop = res.stop;
      }
    };

    const makeRequest = async () => {
      try {
        const res = await fetchTickets(searchId);
        processResponse(res);
      } catch (error) {
        console.log(error);
      }
    };

    while (!stop) {
      await makeRequest();
    }
  };
};

const addFilter = (newState, keyFilter) => {
  newState.filters[keyFilter].checked = true;
  return newState;
};

const removeFilter = (newState, keyFilter) => {
  newState.filters[keyFilter].checked = false;
  return newState;
};

const changeSort = (newState, sortName) => {
  newState.sort = sortName;
  return newState;
};

const handleGetTickets = (newState, tickets, searchStop) => {
  const obj = tickets.reduce((obj, ticket) => {
    const id = nanoid(4);
    ticket.id = id;
    obj[id] = ticket;
    return obj;
  }, {});

  newState.searchStop = searchStop;
  newState.tickets = { ...newState.tickets, ...obj };
  return newState;
};

const reducer = (state = defaultState, actions) => {
  const { type, keyFilter, sortName, searchId, tickets, searchStop } = actions;
  const newState = structuredClone(state);
  switch (type) {
    case ADD_FILTER:
      return addFilter(newState, keyFilter);
    case REMOVE_FILTER:
      return removeFilter(newState, keyFilter);
    case CHANGE_SORT:
      return changeSort(newState, sortName);
    case GET_SEARCH_ID:
      return {
        ...newState,
        searchId: searchId,
      };
    case GET_TICKETS:
      return handleGetTickets(newState, tickets, searchStop);
    default:
      return newState;
  }
};

export default reducer;
