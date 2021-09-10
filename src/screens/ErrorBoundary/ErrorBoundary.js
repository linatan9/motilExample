import React, {Component} from 'react';
import {View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import styles from './styles';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    const {errorType, errorMessage, onClearError} = this.props;
    console.log(errorMessage, 'errorMessage');

    if (errorType === 'error' && errorMessage !== null) {
      this.dropDownAlertRef.alertWithType(
        errorType,
        errorMessage || 'Error',
        errorMessage,
      );
    }

    if (errorType === 'success' && errorMessage !== null) {
      this.dropDownAlertRef.alertWithType(errorType, 'Success', errorMessage);
    }
    onClearError();
  }

  render() {
    const {children} = this.props;
    return (
      <View style={styles.container}>
        {children}
        <DropdownAlert
          containerStyle={{height: 200}}
          ref={ref => (this.dropDownAlertRef = ref)}
          updateStatusBar={false}
        />
      </View>
    );
  }
}

export default ErrorBoundary;
