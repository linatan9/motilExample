import {StyleSheet} from 'react-native';

import {colors} from '../../constants';
import {scaledSize, scaledHeight} from '../../constants/globalStyles';

export default StyleSheet.create({
  container: {
    borderWidth: 0.5,
    height: scaledHeight(50),
    maxHeight: scaledHeight(50),
    width: '100%',
    flex: 1,
    borderRadius: 5,
    borderColor: colors.inactive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: scaledSize(20),
    color: colors.textWhite,
    marginLeft: scaledSize(10),
  },
  marginTopButton: {
    marginTop: scaledSize(10),
  },
});
