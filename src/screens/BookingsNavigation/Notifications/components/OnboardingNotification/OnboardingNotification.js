import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";
import styles from './styles';
import {translate} from '../../../../../i18n';

const OnboardingNotification = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {translate('bookingsNavigation.notifications.onboardingNotification')}
      </Text>
      <icons.Alert/>
    </View>
  )
};

export default OnboardingNotification;
