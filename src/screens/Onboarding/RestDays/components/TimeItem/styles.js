import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.inactive,
    borderRadius: 5,
    width: width * 0.2,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpContainerStyle: {
    width: width * 0.14,
    height: width * 0.16,
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    marginLeft: 0

  },
  inpStyle: {
    color: colors.textWhite,
    textAlign: 'center',
    fontSize: scaledSize(30)
  }
});
