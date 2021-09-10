import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../constants/globalStyles';
import colors from "../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  tebButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkTabBar,
    height: 70,
  },
  tabIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkTabBar,
  }
});
