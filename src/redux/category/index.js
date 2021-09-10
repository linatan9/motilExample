import * as types from './types';

const initState = {
  categories: [],
  mainCategories: [],
  topServices: [],
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES: {
      return {
        ...state,
        categories: action.payload,
      };
    }
    case types.GET_TOP_SERVICES: {
      return {
        ...state,
        topServices: action.payload,
      };
    }
    case types.GET_MAIN_CATEGORIES: {
      return {
        ...state,
        mainCategories: action.payload,
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
