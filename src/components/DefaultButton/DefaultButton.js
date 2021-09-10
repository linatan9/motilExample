import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';

import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

const DefaultButton = ({
  title,
  isTopMargin,
  disabled,
  onPress,
  containerStyle,
  isGray,
  notActive,
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={!disabled && onPress}
    style={{width: '100%'}}>
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={
        notActive
          ? [colors.inactive, colors.inactive]
          : isGray && disabled
          ? [colors.disabledGray, colors.disabledGray]
          : isGray
          ? [colors.bgLight, colors.bgLight]
          : disabled
          ? [colors.disabledYellow, colors.disabledYellow]
          : [colors.secondaryYellow, colors.yellow]
      }
      style={[
        styles.container,
        {...containerStyle},
        isTopMargin ? styles.marginTopButton : {},
      ]}>
      <Text style={isGray ? styles.grayButtonTitleText : styles.titleText}>
        {title}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default DefaultButton;
