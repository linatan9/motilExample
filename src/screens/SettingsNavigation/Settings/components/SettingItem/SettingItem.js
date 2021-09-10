import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";
import {useNavigation} from '@react-navigation/native'

import styles from './styles';

const SettingItem = ({title, subTitle, routeName}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => routeName && navigation.navigate(routeName, { isFromSettings: true })} style={styles.serviceItemContainer}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <icons.ArrowRight/>
    </TouchableOpacity>
  )
};

export default SettingItem;
