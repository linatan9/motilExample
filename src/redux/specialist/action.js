import {store} from '../index';
import * as types from './types';
// import {translate} from '../../i18n';
import * as blockerAction from '../blocker/action';
import API, {setToken} from '../../api';
import {ACCOUNT_SOCIAL_TYPES, LANGUAGES} from '../../constants/data';

import {
  changePasswordAction,
  changeUserProfileAction,
  setSpecialistTransportAction,
  addUserProfileAccountAction,
  setUserLanguageAction,
  signInAction,
} from '../auth/action';
import setI18nConfig from '../../i18n';

export const setServiceAction = services => ({
  type: types.SET_SERVICES,
  payload: services,
});

export const getServicesAction = services => ({
  type: types.GET_SERVICES,
  payload: services,
});

export const getTopServicesAction = services => ({
  type: types.GET_SPECIALIST_TOP_SERVICES,
  payload: services,
});

export const setWorkingHoursAction = workingDays => ({
  type: types.SET_WORKING_HOURS,
  payload: workingDays,
});

export const onChangeDayOffAction = daysOfWeek => ({
  type: types.CHANGE_DAY_OFF,
  payload: daysOfWeek,
});

export const changeDayScheduleAction = workingDays => ({
  type: types.CHANGE_DAY_SCHEDULE,
  payload: workingDays,
});

export const saveDaysOffAction = daysOfWeek => ({
  type: types.SAVE_DAYS_OFF,
  payload: daysOfWeek,
});

export const setPassedIntroAction = () => ({
  type: types.SET_PASSED_INTRO,
});

export const setOnboardingProgressAction = () => ({
  type: types.SET_ONBOARDING_PROGRESS,
});

export const getNotificationsAction = notifications => ({
  type: types.GET_NOTIFICATIONS,
  payload: notifications,
});

export const changeLanguageAction = () => ({
  type: types.CHANGE_LANGUAGE,
});

export const changeTransportAction = () => ({
  type: types.CHANGE_TRANSPORT,
});

export const getDateScheduleAction = () => ({
  type: types.GET_DATE_SCHEDULE,
});

export const setDayoffForCertainDateAction = () => ({
  type: types.GET_DAY_OFF_FOR_CERTAIN_DATE,
});

export const setScheduleCertainDateAction = () => ({
  type: types.SET_SCHEDULE_FOR_CERTAIN_DATE,
});

export const getBackgroundCheckerUrlAction = () => ({
  type: types.GET_BACKGROUND_CHECKER_URL,
});

export const getUpcomingTasksAction = () => ({
  type: types.GET_UPCOMING_TASKS,
});

export const getHistoryTasksAction = () => ({
  type: types.GET_HISTORY_TASKS,
});

export const changeTaskStatusAction = () => ({
  type: types.CHANGE_TASK_STATUS,
});

export const getCustomersAction = () => ({
  type: types.GET_CUSTOMER_LIST,
});

export const getAvailabilityAction = () => ({
  type: types.GET_AVAILABILITY,
});

export const createNewTaskAction = () => ({
  type: types.CREATE_NEW_TASK,
});

export const getCustomerCarsdskAction = () => ({
  type: types.GET_SPECIALIST_CARDS,
});

export const getCustomerCards = id => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/customer/${id}/cards`)
    .then(response => {
      dispatch(getCustomerCarsdskAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const createNewTask = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/tasks`, data)
    .then(response => {
      dispatch(createNewTaskAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getAvailability = (date, id, duration) => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(
    `/specialist/availability?date=${date}&duration=${duration}&specialistId=${id}`,
  )
    .then(response => {
      dispatch(getAvailabilityAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getCustomers = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/customer`)
    .then(response => {
      dispatch(getCustomersAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const changeTaskStatus = (taskId, status) => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.put(`/specialist/tasks/status?status=${status}&taskId=${taskId}`)
    .then(response => {
      dispatch(changeTaskStatusAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      throw error;
    });
};

export const getHistoryTasks = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get('/specialist/tasks/history')
    .then(response => {
      dispatch(getHistoryTasksAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      throw error;
    });
};

export const getUpcomingsTasks = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get('/specialist/tasks/upcoming')
    .then(response => {
      dispatch(getUpcomingTasksAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getBackgroundCheckerUrl = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/checkr/invite`)
    .then(response => {
      dispatch(getBackgroundCheckerUrlAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const setUserFacebook = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/user/facebook`, data)
    .then(response => {
      const accountData = {
        password: null,
        type: ACCOUNT_SOCIAL_TYPES.FACEBOOK,
        uid: data.uid,
        username: data.email,
      };
      dispatch(addUserProfileAccountAction(accountData));
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      throw error;
    });
};

export const setDayOffForCetainDate = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/schedule/date/day_off`, data)
    .then(response => {
      try {
        dispatch(getSchedule());
      } catch (e) {
        console.log(e);
      }
      dispatch(setDayoffForCertainDateAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const setCertainDateSchedule = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/schedule/date`, data)
    .then(response => {
      console.log(response, 'CHANGE DATD PROFILE');
      try {
        dispatch(getSchedule());
      } catch (e) {
        console.log(e);
      }
      dispatch(setScheduleCertainDateAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getDateSchedule = date => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/specialist/schedule/date?date=${date}`)
    .then(response => {
      console.log(response, 'CHANGE DATD PROFILE');
      dispatch(getDateScheduleAction());
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const changeUserProfile = data => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.put('/specialist', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
    .then(response => {
      console.log('response: ', response);
      console.log(response.data?.data, 'CHANGE DATD PROFILE');
      dispatch(changeUserProfileAction(response.data?.data?.user));
      dispatch(blockerAction.setLoading(false));
      return response.data.data;
    })
    .catch(error => {
      console.log('error: ', error);
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const changeTransport = vehicle => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.put(`/specialist/vehicle?type=${vehicle}`)
    .then(response => {
      console.log(response, 'RESPONSE CHANGE TRANSPORT');
      dispatch(changeTransportAction());
      dispatch(setSpecialistTransportAction(response.data?.data));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const changeLanguage = language => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.put(`/specialist/language?language=${language}`)
    .then(response => {
      console.log(response, 'RESPONSE');
      setI18nConfig({languageTag: language, isRTL: false});
      dispatch(changeLanguageAction());
      dispatch(setUserLanguageAction(response.data?.data));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const onChangeDayOff = daysOfWeek => dispatch => {
  dispatch(onChangeDayOffAction(daysOfWeek));
};

export const setOnboardingProgress = notificaionSlug => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/notification/complete/${notificaionSlug}`)
    .then(response => {
      console.log(response, 'RESPONSE');
      dispatch(setOnboardingProgressAction());
      dispatch(getNotifications());
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getSchedule = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/specialist/schedule`)
    .then(response => {
      console.log(response, 'RESPONSE');
      dispatch(setWorkingHoursAction({...response.data?.data}));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getNotifications = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/notification/`)
    .then(response => {
      dispatch(getNotificationsAction(response.data?.data));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const setPassedIntro = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.put(`/specialist/intro-slides?status=true`)
    .then(response => {
      console.log(response, 'RESPONSE');
      dispatch(setPassedIntroAction());
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const setServices = servicesIds => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/services`, {services: servicesIds})
    .then(response => {
      console.log(response, 'RESPONSE');
      dispatch(setServiceAction(response.data?.data?.services));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const removeServices = servicesIds => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.delete(`/specialist/services`, {data: {services: servicesIds}})
    .then(response => {
      console.log(response, 'RESPONSE');
      dispatch(setServiceAction(response.data?.data?.services));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const getSpecialistServices = () => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.get(`/specialist/service`)
    .then(response => {
      console.log(response.data);
      dispatch(getServicesAction(response.data?.data?.services));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data?.services;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const setWorkingHours = workingHours => dispatch => {
  dispatch(blockerAction.setLoading(true));
  console.log(workingHours, 'workingHours');
  return API.post(`/specialist/schedule/workingdays`, workingHours)
    .then(response => {
      console.log(response.data, 'YES');
      dispatch(setWorkingHoursAction(response?.data?.data));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      console.log(error, 'ERROR');
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const changeDaySchedule = dayOfWeek => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/schedule/day`, dayOfWeek)
    .then(response => {
      console.log(response.data, 'YES changeDaySchedule');
      dispatch(changeDayScheduleAction(response?.data?.data));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      console.log(error, 'ERROR');
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const saveDaysOff = daysOff => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.post(`/specialist/schedule/day_off`, daysOff)
    .then(response => {
      dispatch(saveDaysOffAction(response?.data?.data));
      dispatch(blockerAction.setLoading(false));
      return response.data?.data;
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      console.log(error, 'ERROR');
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};

export const shareLink = (link, notificationSlug) => dispatch => {
  dispatch(blockerAction.setLoading(true));
  return API.put(`/specialist/shareable-link`, {url: link})
    .then(r => {
      dispatch(setOnboardingProgress(notificationSlug)).then(res => {
        dispatch(getNotifications()).then(resp => {
          dispatch(blockerAction.setLoading(false));
        });
      });
    })
    .catch(error => {
      dispatch(blockerAction.setLoading(false));
      console.log(error, 'ERROR');
      // dispatch(errorAction.runError('error', error));
      throw error;
    });
};
