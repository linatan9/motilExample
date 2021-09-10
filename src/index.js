import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
// import {ReduxNetworkProvider} from 'react-native-offline';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings } from 'react-native-fbsdk-next';

import ErrorBoundary from '../src/screens/ErrorBoundary';
import AppNavigator from './navigation';

import {store, persistor} from './redux';
import BlockerLoader from './components/BlockerLoader';
import setI18nConfig from './i18n';
import { LANGUAGES, WEB_CLIENT_ID } from './constants/data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
    setI18nConfig({languageTag: LANGUAGES.ENGLISH, isRTL: false});
    Settings.initializeSDK();
  }
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <PersistGate loading={null} persistor={persistor}>
            <BlockerLoader isShowLoader={this.state.loading}/>
            <AppNavigator {...store.getState()} />
          </PersistGate>
        </ErrorBoundary>
      </Provider>
    );
  }
}

export default App;
