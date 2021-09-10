import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
  },
  title: {
    color: colors.textWhite,
  }
});
