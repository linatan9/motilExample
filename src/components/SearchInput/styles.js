import {StyleSheet} from 'react-native';
import {fonts, colors} from '../../constants';

import {body16Regular, scaledHeight} from '../../constants/globalStyles';

export default StyleSheet.create({
  inpStyle: {
    ...body16Regular,
    fontWeight: '600',
    color: colors.inactive,
    paddingRight: 20,
  },
  focusedInputBorder: {
    borderBottomColor: colors.yellow,
  },
  inpContainerStyle: {
    borderBottomColor: 'red',
    borderBottomWidth: 0,
    width: '100%',
    height: scaledHeight(50),
    backgroundColor: colors.bgLight,
    borderRadius: 10,
    paddingLeft:10,
  },
  inpContainer: {
    marginTop: scaledHeight(24),
    paddingHorizontal: 0,
  },
  labelStyle: {
    fontWeight: '100',
    fontSize: 14,
    color: colors.textWhite
  },
  labelIncorrect: {
    color: colors.red
  },
});
