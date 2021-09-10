import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';
import * as blockerAction from '../blocker/action';
import API, {setToken} from '../../api';

export const getServicesAction = () => ({
  type: types.GET_SERVICES,
});

export const getServicesByCategory = category => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/service?category=${category}`)
    .then(response => {
      dispatch(getServicesAction());
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};
