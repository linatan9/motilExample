import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {colors, icons} from "../../../../../constants";

import styles from './styles';
import Location from '../../../../../assets/icons/location-point.svg';
import { BOOKING_STATUSES, BOOKINGS_TABS, STATUS_COLOR_MAP } from '../../../../../constants/data';



const BookingTabs = ({activeTab, onChange}) => {
  const isActiveUpcoming = activeTab === BOOKINGS_TABS.UPCOMING;
  const isActiveHistory = activeTab === BOOKINGS_TABS.HISTORY;
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => onChange(BOOKINGS_TABS.UPCOMING)}
        style={[
          styles.tabContainer,
          {
            borderBottomWidth: isActiveUpcoming ? 2 : 0,
            borderBottomColor: colors.yellow,
            paddingBottom: isActiveUpcoming ? 12 : 13,
          }
        ]}
      >
        <Text style={[styles.title, {fontWeight: isActiveUpcoming ? 'bold': 'normal'}]}>{BOOKINGS_TABS.UPCOMING}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange(BOOKINGS_TABS.HISTORY)}
        style={[
          styles.tabContainer,
          {
            borderBottomWidth: isActiveHistory ? 2 : 0,
            borderBottomColor: colors.yellow,
            paddingBottom: isActiveHistory ? 12 : 13,
          }
        ]}
      >
        <Text style={[styles.title, {fontWeight: isActiveHistory ? 'bold': 'normal'}]}>{BOOKINGS_TABS.HISTORY}</Text>
      </TouchableOpacity>
    </View>
  )
};

export default BookingTabs;
