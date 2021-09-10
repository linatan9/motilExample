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
import LinearGradient from "react-native-linear-gradient";

const TransportItem = ({icon, id, onPress, activeId, isLast}) => {
  return (
    id === activeId ? (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[colors.secondaryYellow, colors.yellow] }
        style={[styles.transportItemContainer, {marginRight: isLast ? 0 : 10}]}
      >
        {icon}
      </LinearGradient>
    ) : (
      <TouchableOpacity onPress={() => onPress(id)} style={[styles.transportItemContainer, {marginRight: isLast ? 0 : 10}]}>
        {icon}
      </TouchableOpacity>
    )
  )
};

export default TransportItem;
