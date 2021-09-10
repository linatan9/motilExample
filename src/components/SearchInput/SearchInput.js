import React, {useState} from 'react';

import {Input} from 'react-native-elements';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import {colors, icons} from "../../constants";

const SearchInput = (props: any) => {
  const [hidePassword, steHidePassword] = useState(true);
  const [value, setValue] = useState('');
  const onChangeState = () => {
    steHidePassword(!hidePassword)
  };



  const [isOnFocus, setIsOnFocus] = useState(false);

  const {secureTextEntry, inpContainerStyle, invalidText, isInvalid, onSubmitEditing} = props;
  return (
      <Input
        {...props}
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => setIsOnFocus(false)}
        secureTextEntry={secureTextEntry}
        onChangeText={setValue}
        autoCapitalize="none"
        leftIcon={
          <TouchableOpacity>
            <icons.SearchIcon style={{marginLeft: 10}}/>
          </TouchableOpacity>
        }
        placeholderTextColor={colors.inactive}
        inputStyle={styles.inpStyle}
        inputContainerStyle={[styles.inpContainerStyle, inpContainerStyle, isOnFocus ? styles.focusedInputBorder : {}]}
        containerStyle={styles.inpContainer}
        labelStyle={[styles.labelStyle, {color: !!invalidText ? colors.red : colors.textWhite}]}
        errorMessage={invalidText && (invalidText || 'Field is required*')}
        onSubmitEditing={() => onSubmitEditing && value !== '' && onSubmitEditing(value)}
      />
  );
};

export default SearchInput;
