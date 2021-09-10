import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";
import {useNavigation} from '@react-navigation/native'

import styles from './styles';
import CheckBox from 'react-native-elements/dist/checkbox/CheckBox';

const LanguageItem = ({title, subTitle, routeName, isChecked, id, onChange, checkedLanguageId}) => {
  return (
    <View style={styles.serviceItemContainer}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.subTitle}>{subTitle}</Text>
      </View>
      <CheckBox
        checked={id === checkedLanguageId}
        checkedIcon={<icons.CheckedCheckboxIcon height={20}/>}
        uncheckedIcon={<icons.UncheckedCheckboxIcon height={20}/>}
        onPress={() => onChange(id)}
        containerStyle={{
          backgroundColor: colors.bgLight,
          borderWidth: 0,
          paddingLeft: 0,
          marginLeft: 0,
        }}
        textStyle={{
          color: colors.textWhite,
          fontWeight: 'normal',
        }}
      />
    </View>
  )
};

export default LanguageItem;
