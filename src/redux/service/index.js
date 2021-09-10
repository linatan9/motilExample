import * as types from './types';

const initState = {

};

const serviceReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_SERVICES: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default serviceReducer;
