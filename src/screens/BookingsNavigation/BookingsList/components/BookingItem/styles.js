import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    flexDirection: 'column',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.lightGrayBorder,
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  userName: {
    fontSize: scaledSize(18),
    color: colors.textWhite,
    fontWeight: 'bold',
  },
  title: {
    fontSize: scaledSize(14),
    color: colors.textWhite,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: '49%',
  },
  statusFailText: {
    color: colors.red,
    fontWeight: 'bold',
  },
  statusOkText: {
    color: colors.green,
    fontWeight: 'bold',
  },
  statusText: {
    fontWeight: 'bold',
  },
});
