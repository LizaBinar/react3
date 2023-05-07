import { ADD_FILTER, CHANGE_SORT, GET_SEARCH_ID, REMOVE_FILTER } from './tupes';
import axios from 'axios';
import { MAIN_ROOT, SEARCH_ID } from '../api/base';

export const add = (key) => {
  return { type: ADD_FILTER, keyFilter: key };
};

export const remove = (key) => {
  return { type: REMOVE_FILTER, keyFilter: key };
};

export const changeSort = (sortName) => {
  return { type: CHANGE_SORT, sortName: sortName };
};

export const getSearchID = () => {
  return async (dispatch) => {
    const response = await axios(MAIN_ROOT + SEARCH_ID);
    dispatch({
      type: GET_SEARCH_ID,
      searchId: response.data.searchId,
    });
  };
};
