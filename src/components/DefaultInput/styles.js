import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

import {body16Regular, scaledHeight} from '../../constants/globalStyles';

export default StyleSheet.create({
  inpStyle: {
    ...body16Regular,
    fontWeight: '600',
    color: colors.textWhite,
    fontSize: scaledHeight(13),
  },
  focusedInputBorder: {
    borderBottomColor: colors.yellow,
  },
  inpContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textWhite,
    width: '100%',
    height: scaledHeight(30),
  },
  inpContainer: {
    marginTop: scaledHeight(5),
    paddingHorizontal: 0,
  },
  labelStyle: {
    fontWeight: '100',
    fontSize: scaledHeight(13),
    color: colors.textWhite,
  },
  labelIncorrect: {
    color: colors.red,
  },
  errorStyle: {
    marginBottom: 0,
    fontSize: 10,
  },
});
