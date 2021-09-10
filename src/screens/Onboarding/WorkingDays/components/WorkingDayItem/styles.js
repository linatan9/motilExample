import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledHeight,
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 15,
    width: '100%',
    backgroundColor: colors.bgLight,
    borderRadius: 5,
    marginTop: 15,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dayTitle: {
    color: colors.textWhite,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  intervalText: {
    color: colors.textWhite,
    fontSize: scaledSize(14),
  },
  editContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editText: {
    color: colors.yellow,
  },
  timeRow: {
    flexDirection: 'row'
  },
  dayTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
