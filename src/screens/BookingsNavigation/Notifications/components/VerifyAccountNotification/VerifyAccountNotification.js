import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";
import styles from './styles';
import {translate} from '../../../../../i18n';

const VerifyAccountNotification = ({}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.title}>
          {`${translate('bookingsNavigation.notifications.сongratulations')}}! `}
        </Text>
        <Text style={styles.subTitle}>
          {translate('bookingsNavigation.notifications.verifyAccountNotification')}
        </Text>
      </View>
      <icons.VerifyAccount/>
    </View>
  )
};

export default VerifyAccountNotification;
