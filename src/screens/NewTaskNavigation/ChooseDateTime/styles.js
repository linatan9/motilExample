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
  availablesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  availablesColumnContainer: {
    flex: 1,
  },
  timeSlotContainer: {
    padding: 6,
    backgroundColor: colors.bgLight,
    marginTop: 7,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotText: {
    color: colors.textWhite,
    fontSize: scaledSize(18),
  },
  availableSlotTitle: {
    color: colors.textWhite,
    textAlign: 'center',
    lineHeight: scaledSize(30),
    fontSize: scaledSize(14)
  }
});
