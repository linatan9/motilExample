import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  itemContainer: {
    width: width * 0.6,
    minWidth: width * 0.6,
    height: width * 0.55,
    borderWidth: 3,
    borderColor: colors.inactive,
    marginTop: 15,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    color: colors.textWhite,
    fontSize: scaledSize(40)
  },
  title: {
    color: colors.textWhite,
  },
});
