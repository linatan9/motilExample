import * as types from './types';

const initState = {
  services: [],
  daysOfWeek: [],
  customerNotifications: [],
  specialistNotifications: [],
  workingDays: {},
};

const specialistReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_SERVICES: {
      return {
        ...state,
        services: action.payload,
      };
    }
    case types.SET_SERVICES: {
      return {
        ...state,
        services: action.payload,
      };
    }
    case types.GET_NOTIFICATIONS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.SAVE_DAYS_OFF:
    case types.CHANGE_DAY_SCHEDULE:
    case types.SET_WORKING_HOURS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case types.CHANGE_DAY_OFF: {
      return {
        ...state,
        daysOfWeek: action.payload,
      };
    }
    case types.GET_SPECIALIST_CARDS:
    case types.CREATE_NEW_TASK:
    case types.GET_CUSTOMER_LIST:
    case types.GET_AVAILABILITY:
    case types.CHANGE_TASK_STATUS:
    case types.GET_BACKGROUND_CHECKER_URL:
    case types.GET_UPCOMING_TASKS:
    case types.GET_HISTORY_TASKS:
    case types.SET_SCHEDULE_FOR_CERTAIN_DATE:
    case types.GET_DAY_OFF_FOR_CERTAIN_DATE:
    case types.GET_DATE_SCHEDULE:
    case types.CHANGE_LANGUAGE:
    case types.SET_PASSED_INTRO:
    case types.SET_ONBOARDING_PROGRESS:
    default:
      return state;
  }
};

export default specialistReducer;
