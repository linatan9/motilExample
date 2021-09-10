import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';

export const setError = (errorType, errorMessage) => ({
  type: types.SET_ERROR,
  errorType,
  errorMessage,
});

export const setMarkedDatesAction = (dates) => ({
  type: types.SET_MARKED_DATES,
  payload: dates
});


export const setMarkedDates = (markedDates) => dispatch => {
  dispatch(setMarkedDatesAction(markedDates));
};
