import React, {useState} from 'react';

import {Input} from 'react-native-elements';

import styles from './styles';
import {colors} from '../../constants';

const DefaultInput = props => {
  const [isOnFocus, setIsOnFocus] = useState(false);

  const {
    secureTextEntry,
    inpContainerStyle,
    invalidText,
    renderErrorMessage,
    labelStyle,
    containerStyle,
    inputStyle,
    disabled,
  } = props;
  return (
    <Input
      {...props}
      onFocus={() => setIsOnFocus(true)}
      onBlur={() => setIsOnFocus(false)}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      placeholderTextColor={colors.grayText}
      inputStyle={[styles.inpStyle, inputStyle]}
      inputContainerStyle={[
        styles.inpContainerStyle,
        inpContainerStyle,
        isOnFocus
          ? styles.focusedInputBorder
          : disabled
          ? {borderBottomColor: colors.grayText}
          : {},
      ]}
      containerStyle={[styles.inpContainer, containerStyle]}
      labelStyle={[
        styles.labelStyle,
        labelStyle,
        {
          color: !!invalidText
            ? colors.red
            : disabled
            ? colors.grayText
            : colors.textWhite,
        },
      ]}
      errorStyle={styles.errorStyle}
      errorMessage={invalidText && (invalidText || 'Field is required*')}
      renderErrorMessage={renderErrorMessage}
    />
  );
};

export default DefaultInput;
