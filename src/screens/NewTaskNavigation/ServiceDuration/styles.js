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
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleText: {
    color: colors.textWhite,
    fontSize: scaledSize(15),
  },
  minimumText: {
    color: colors.textWhite,
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  durationContainer: {

  }
});
