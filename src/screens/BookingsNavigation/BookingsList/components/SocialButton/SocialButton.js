import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import {colors, icons} from "../../../../../constants";

import styles from './styles';
import { CONNECTS_TYPE } from '../../../../../constants/data';



const SocialButton = ({title, icon, onPress, isMessage, phone, facebookId, type}) => {

  const onClick = () => {
    const formtedPhone = phone ? phone.match(/\d+/g).join('') : '';
    switch (type) {
      case CONNECTS_TYPE.WHATS_APP:
        Linking.canOpenURL(`whatsapp://send?phone=${formtedPhone}`).then(() => {
          Linking.openURL(`whatsapp://send?phone=${formtedPhone}`);
          onPress();
        }).catch(e => {
          Alert.alert('Error', 'Please install WhatsApp');
        });
        onPress();
        return;
      case CONNECTS_TYPE.FACEBOOK:
        Linking.canOpenURL(`m.me/${facebookId}`).then(() => {
          Linking.openURL(`m.me/${facebookId}`);
          onPress();
        }).catch(e => {
          Alert.alert('Error', 'Please install Facebook Messenger');
        });
        return;
      case CONNECTS_TYPE.PHONE:
        isMessage ? Linking.openURL(`sms:${formtedPhone}`) : Linking.openURL(`tel:${formtedPhone}`);
        onPress();
    }
  };

  return (
    <TouchableOpacity onPress={onClick} style={[styles.container]}>
      <Text style={styles.title}>{title}</Text>
      {icon}
    </TouchableOpacity>
  )
};

export default SocialButton;
