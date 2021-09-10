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

  checkBoxContainer: {
    width: '100%',
    alignItems: 'flex-start'
  },
  poweredContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.stripeBg,
    borderRadius: 5,
    width: '60%',
    justifyContent: 'center'
  },
  poweredText: {
    color: colors.textWhite,
  },
  stripteText: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: colors.textWhite,
  }
});
