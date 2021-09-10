import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './styles';

export const SocialButton = ({icon, title, isTopMargin, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isTopMargin ? styles.marginTopButton : {}]}>
      {icon}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};
