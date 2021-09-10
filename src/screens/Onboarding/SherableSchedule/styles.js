import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../constants/globalStyles';
import colors from "../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.mainBG,
    padding: 20,
    justifyContent: 'space-between'
  },
  titleText1: {
    color: colors.textWhite,
  },
  titleText2: {
    color: colors.textWhite,
    marginTop: 20,
  },
  successText: {
    color: colors.green,
    alignItems: 'center',
    textAlign: 'center',
  },
});
