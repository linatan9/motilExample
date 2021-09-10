import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../constants/globalStyles';
import colors from "../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.mainBG,
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
    width: '100%',
    textAlign: 'left',
    color: colors.textWhite
  },
  itemsRowContainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 15,
  }
});
