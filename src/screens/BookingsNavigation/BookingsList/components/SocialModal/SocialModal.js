import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";

import styles from './styles';
import Location from '../../../../../assets/icons/location-point.svg';
import { BOOKING_STATUSES, STATUS_COLOR_MAP } from '../../../../../constants/data';
import moment from 'moment';



const SocialModal = ({title, onExpand, date, children}) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  )
};

export default SocialModal;
