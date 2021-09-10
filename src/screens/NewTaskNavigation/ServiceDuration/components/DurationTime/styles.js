import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledHeight,
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  valuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeDurationButton: {
    width: scaledSize(35),
    height: scaledSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeDurationButtonText: {
    color: colors.textWhite,
    fontSize: scaledSize(30),
  },
  durationValueItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationItemValueText: {
    color: colors.textWhite,
    fontSize: scaledSize(45),
    marginLeft: 3,
    marginRight: 3,
  },
  timeValuesTitle: {
    color: colors.textWhite,
    flex: 1,
    fontSize: scaledSize(13)
  },
  durationTitlesRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
