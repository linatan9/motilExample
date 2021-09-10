import * as types from './types';

const initState = {
  markedDates: []
};

const testReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_MARKED_DATES: {
      return {
        ...state,
        markedDates: action.payload,
      };
    }
    default:
      return state;
  }
};

export default testReducer;
