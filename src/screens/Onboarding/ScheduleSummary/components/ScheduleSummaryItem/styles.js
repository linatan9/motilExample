import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  serviceItemContainer: {
    width: '100%',
    height: width * 0.23,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 0.5,
    borderColor: colors.grayText,
    borderRadius: 5,
    marginTop: 15,
    overflow: 'hidden',
    backgroundColor: colors.bgLight,
    paddingRight: 25,
  },
  titlesContainer: {
    width: '100%',
    overflow: 'hidden',
    paddingRight: 20,
  },
  title: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: scaledSize(18)
  },
  subTitle: {
    color: colors.textWhite,
    width: '100%',
    overflow: 'hidden'
  },
});
