import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../../../constants";

import styles from './styles';
import LinearGradient from "react-native-linear-gradient";


const ServiceItem = ({title, price, id, onPress, isChecked, backgroundColor}) => {
  console.log(backgroundColor)
  return (
    <TouchableOpacity onPress={() => onPress(id)} style={[styles.serviceItemContainer, {backgroundColor: backgroundColor}]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[backgroundColor ? backgroundColor : colors.yellow, backgroundColor ? backgroundColor : colors.yellow] }
        style={styles.serviceItemContainerGradient}
      >
        <View style={styles.serviceItemTitleContainer}>
          <Text numberOfLines={2} style={[styles.serviceTitle]}>{title}</Text>
        </View>
        <View style={styles.serviceItemPriceContainer}>
          <Text style={[styles.servicepriceText, {color: isChecked ? colors.background : colors.textWhite}]}>${price}/hr</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )
};

export default ServiceItem;
