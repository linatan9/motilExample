import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// import {reducer as network} from 'react-native-offline';

import errorReducer from './error';
import testReducer from './test';
import authReducer from './auth';
import blockerReducer from './blocker';
import categoryReducer from './category';
import serviceReducer from './service';
import specialistReducer from './specialist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  blacklist: ['error'],
  timeout: null,
};

const rootReducer = combineReducers({
  error: errorReducer,
  test: testReducer,
  auth: authReducer,
  blocker: blockerReducer,
  category: categoryReducer,
  service: serviceReducer,
  specialist: specialistReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export default pReducer;
