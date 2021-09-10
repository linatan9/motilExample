import * as types from './types';

const initState = {
  loading: null,
  user: null,
};

const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SIGNUP_EXTERNAL:
    case types.SIGNUP: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case types.REFRESH_TOKEN: {
      const user = {...state.user};
      user.token = action.payload;
      return {
        ...state,
        user: user,
      };
    }
    case types.LOG_OUT: {
      return {
        ...state,
        user: null,
      };
    }
    case types.CHANGEUSER_PROFILE: {
      const user = {...state.user};
      user.user = action.payload;
      return {
        ...state,
        user: user,
      };
    }
    case types.SET_SPECIALIST_TRANSPORT: {
      const user = {...state.user};
      user.user.specialistProfile.vehicleType = action.payload.specialistProfile.vehicleType;
      return {
        ...state,
        user: user,
      };
    }
    case types.SET_USER_LANGUAGE: {
      const user = {...state.user};
      user.user.selectedLanguage = action.payload.selectedLanguage;
      return {
        ...state,
        user: user,
      };
    }
    case types.ADD_USER_ACCOUNT: {
      const user = {...state.user};
      user.user.accounts.push(action.payload);
      return {
        ...state,
        user: user,
      };
    }
    case types.SIGNIN_EXTERNAL:
    case types.SIGNIN: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case types.SET_ERROR: {
      return {
        ...state,
        message: action.errorMessage,
        type: action.errorType,
      };
    }
    case types.CHANGE_PASSWORD:
    default:
      return state;
  }
};

export default errorReducer;
