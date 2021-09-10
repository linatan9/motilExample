import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import {colors, icons} from "../../constants";
import { scaledSize } from '../../constants/globalStyles';


export const MainHeader = ({
   leftIcon,
   onLeftIconClick,
   rightIcon,
   onRightIconClick,
   title,
   isNoBackArrow,
   rightButton,
   onRightButtonClick,
 }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionIconContainerLeft} onPress={onLeftIconClick}>
        {
          !isNoBackArrow ? (
            <icons.HeaderArrowLeft height={scaledSize(19)}/>
          ) : leftIcon ? (
            leftIcon
          ) : null
        }
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {
        rightButton ? (
          <TouchableOpacity onPress={onRightButtonClick} style={styles.rightButtonContainer}>
            {rightButton}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.actionIconContainerRight} onPress={onRightIconClick}>
            {rightIcon}
          </TouchableOpacity>
        )
      }
    </View>
  )
};
