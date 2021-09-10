import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../constants/globalStyles';
import colors from "../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  stripeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  stripe: {
    paddingVertical: 17,
    paddingHorizontal: 50,
    backgroundColor: colors.stripeBg,
    borderRadius: 5
  },
  stripeText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledSize(14),
    color: '#FFFFFF'
  },
  status: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: scaledSize(12),
    color: '#00B859',
    marginLeft: 32,
  }
});
