import {StyleSheet} from 'react-native';

import {colors} from '../../constants';
import {scaledHeight, scaledSize} from '../../constants/globalStyles';

export default StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    height: scaledHeight(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    color: colors.mainText,
  },
  grayButtonTitleText: {
    fontSize: scaledSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  marginTopButton: {
    marginTop: scaledSize(10),
  },
  btnStyle: {
    marginTop: scaledHeight(20),
    borderRadius: 10,
  },
  btnTitle: {
    fontSize: scaledSize(15),
    color: '#F3F3F5',
  },
  grayBtn: {
    height: scaledHeight(50),
    marginTop: scaledHeight(20),
    borderRadius: 10,
  },
  grayBtnTitle: {
    fontSize: scaledSize(14),
    color: 'black',
  },
});
