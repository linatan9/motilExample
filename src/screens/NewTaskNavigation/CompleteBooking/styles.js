import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../constants/globalStyles';
import colors from "../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: colors.textWhite,
    fontSize: scaledSize(22),
    marginTop: 25,
  }
});
