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
  itemRow: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  editContainer: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  editText: {
    color: colors.yellow,
  },
  itemTitle: {
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: scaledSize(18),
  },
  itemSubTitle: {
    color: colors.textWhite,
    fontSize: scaledSize(14),
    marginTop: 2,
  },
  itemEstimateSubTitle: {
    color: colors.inactive,
    fontSize: scaledSize(14),
    marginTop: 2,
  },
  paymentSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: scaledSize(18),
    fontWeight: 'bold',
  },
  promocodeStatusText: {
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: scaledSize(18),
    marginTop: 2,
  }
});
