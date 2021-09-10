import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../../constants/globalStyles';
import colors from "../../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  serviceItemContainer: {
    width: width * 0.43,
    height: width * 0.23,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.grayText,
    borderRadius: 5,
    marginTop: 15,
  },
  serviceItemContainerGradient: {
    padding: 10,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.grayText,
    borderRadius: 5,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: scaledSize(20),
    color: colors.textWhite,
    marginTop: 10,
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: scaledSize(20),
    color: colors.textWhite,
    width: '100%'
  },
  serviceItemTitleContainer: {
    width: '100%',
    flexWrap: 'wrap'
  },
  serviceItemPriceContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  servicepriceText: {
    color: colors.textWhite
  }
});
