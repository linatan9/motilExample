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
import {translate} from '../../../../../i18n';

const BookingItemsDateContainer = ({isOpen, onExpand, date, children}) => {
  console.log(date, 'date')
  const isToday = moment(date).isSame(moment());
  const isTomorrow = moment(date).isSame(moment().add(1, 'day'));
  return (
    <View style={[styles.container]}>
      <View style={styles.infoRow}>
        <Text style={styles.userName}>
          {
            isToday ? `${translate('bookingsNavigation.bookingsList.bookingItemsDateContainer.today')}, ${moment(date, 'YYYY-MM-DD hh:mm a').format('MMM DD')}` : isTomorrow ? `${translate('bookingsNavigation.bookingsList.bookingItemsDateContainer.tomorrow')}, ${moment(date, 'YYYY-MM-DD hh:mm a').format('MMM DD')}` : moment(date, 'YYYY-MM-DD hh:mm a').format('MMM DD')
          }
          </Text>
        <TouchableOpacity style={{padding: 5}} onPress={() => onExpand(date)}>
           {isOpen ? <icons.ArrowUp/> : <icons.ArrowDown/>}
        </TouchableOpacity>
      </View>
      {isOpen ? children : null}
    </View>
  )
};

export default BookingItemsDateContainer;
