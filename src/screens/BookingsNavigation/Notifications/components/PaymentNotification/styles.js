import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.lightGrayBorder,
    borderRadius: 5,
  },
  title: {
    color: colors.textWhite,
    fontSize: scaledSize(14)
  },
  paid: {
    fontWeight: 'bold',
    color: colors.green,
    fontSize: scaledSize(14)
  }
});
