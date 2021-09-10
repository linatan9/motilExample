import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {colors, icons} from "../../../../../constants/index";
import {Input} from 'react-native-elements';
import styles from './styles';
import LinearGradient from "react-native-linear-gradient";


const TimeItem = ({title, price, id, onPress, isChecked}) => {
  return (
    <View onPress={() => onPress(id)} style={styles.container}>
      <Input
        autoCapitalize="none"
        placeholderTextColor={colors.grayText}
        inputStyle={styles.inpStyle}
        inputContainerStyle={[styles.inpContainerStyle]}
        containerStyle={styles.inpContainer}
        maxLength={2}
        renderErrorMessage={false}
      />
    </View>
  )
};

export default TimeItem;
