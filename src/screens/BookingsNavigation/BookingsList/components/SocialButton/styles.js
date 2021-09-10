import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.bgLight,
    marginTop: 10,
  },
  title: {
    color: colors.textWhite,
    marginRight: 5,
    fontWeight: 'bold',
  }
});
