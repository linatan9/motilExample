import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';
import * as blockerAction from '../blocker/action';
import API, {setToken} from '../../api';

const setLoading = loading => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const signUpAction = userData => ({
  type: types.SIGNUP,
  payload: userData,
});

export const signUpExternalAction = userData => ({
  type: types.SIGNUP_EXTERNAL,
  payload: userData,
});

export const changePasswordAction = () => ({
  type: types.CHANGE_PASSWORD,
});

export const signInAction = userData => ({
  type: types.SIGNIN,
  payload: userData,
});

export const signInExternalAction = userData => ({
  type: types.SIGNIN_EXTERNAL,
  payload: userData,
});

export const setUserLanguageAction = lang => ({
  type: types.SET_USER_LANGUAGE,
  payload: lang,
});
export const setSpecialistTransportAction = transport => ({
  type: types.SET_SPECIALIST_TRANSPORT,
  payload: transport,
});
export const changeUserProfileAction = userData => ({
  type: types.CHANGEUSER_PROFILE,
  payload: userData,
});

export const addUserProfileAccountAction = account => ({
  type: types.ADD_USER_ACCOUNT,
  payload: account,
});

export const refreshTokenAction = token => ({
  type: types.REFRESH_TOKEN,
  payload: token,
});

export const logOutAction = () => ({
  type: types.LOG_OUT,
});

export const resetPAsswordRequestAction = () => ({
  type: types.LOG_OUT,
});

export const resetPasswordRequest = email => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post('/user/password/recovery/request', {email: email})
    .then(response => {
      dispatch(resetPAsswordRequestAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data.token;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const refreshToken = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get('/auth/token/refresh', data)
    .then(response => {
      setToken(response.data.data.token);
      dispatch(refreshTokenAction(response.data.data.token));
      dispatch(blockerAction.setLoading(false));
      return response.data.data.token;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const changePassword = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post('/user/password/change', data)
    .then(response => {
      dispatch(changePasswordAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const signIn = (email, password, coordinates, fcmToken) => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post('/auth/login', {
    email,
    password,
    coordinates,
    device: {
      type: 'specialist-device',
      token: fcmToken,
    },
  })
    .then(response => {
      setToken(response.data.data.token);
      dispatch(signInAction(response.data.data));
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const signInExternal = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post('/auth/login/external', data)
    .then(response => {
      setToken(response.data.data.token);
      dispatch(signInExternalAction(response.data.data));
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const signUp = data => dispatch => {
  delete data.confirmPassword;
  dispatch(blockerAction.setLoading(true));
  return API.post('/user/register', data)
    .then(response => {
      setToken(response.data.data.token);
      dispatch(signUpAction(response.data.data));
      dispatch(blockerAction.setLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const signUpExternal = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post('/user/register/external', data)
    .then(response => {
      setToken(response.data.data.token);
      dispatch(signUpExternalAction(response.data.data));
      dispatch(blockerAction.setLoading(false));
      return response;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};
