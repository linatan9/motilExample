import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';
import * as blockerAction from '../blocker/action';
import API, {setToken} from '../../api';

export const getCategoriesAction = categories => ({
  type: types.GET_CATEGORIES,
  payload: categories,
});

export const getMainCategoriesAction = categories => ({
  type: types.GET_MAIN_CATEGORIES,
  payload: categories,
});
export const getTopServicesAction = services => ({
  type: types.GET_TOP_SERVICES,
  payload: services,
});

export const getServiceByName = name => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/service?name=${name}`)
    .then(response => {
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      throw error;
    });
};

export const getTopServices = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get('/service/top')
    .then(response => {
      dispatch(getTopServicesAction(response.data?.data?.services));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getCategories = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get('/category')
    .then(response => {
      dispatch(getCategoriesAction(response.data?.data?.categories));
      dispatch(blockerAction.setLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getMainCategories = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get('/category/top')
    .then(response => {
      dispatch(getMainCategoriesAction(response.data?.data?.categories));
      dispatch(blockerAction.setLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};
