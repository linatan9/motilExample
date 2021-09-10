import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";
import styles from './styles';
import {translate} from '../../../../../i18n';

const PaymentNotification = ({notification}) => {
  console.log(notification, 'notification')
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.title}>
        {
          `${translate('bookingsNavigation.notifications.paymentNotification')} ${notification.customerFirstName} ${notification.customerLastName}.`
        }
      </Text>
      <Text style={styles.paid}>+ ${notification.amount}</Text>
    </View>
  )
};

export default PaymentNotification;
