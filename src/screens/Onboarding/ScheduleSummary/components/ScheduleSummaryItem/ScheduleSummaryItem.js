import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {icons} from '../../../../../constants';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

const ScheduleSummaryItem = ({title, subTitle, routeName}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routeName)}
      style={styles.serviceItemContainer}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={1} style={styles.subTitle}>
          {subTitle}
        </Text>
      </View>
      <icons.ArrowRight />
    </TouchableOpacity>
  );
};

export default ScheduleSummaryItem;
