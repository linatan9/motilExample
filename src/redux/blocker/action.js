import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';
import API from '../../api';

export const setLoading = loading => ({
  type: types.SET_LOADING,
  payload: loading,
});
