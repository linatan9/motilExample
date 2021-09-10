import * as types from './types';

const initState = {
  loading: null,
};

const blockerReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }
    default:
      return state;
  }
};

export default blockerReducer;
