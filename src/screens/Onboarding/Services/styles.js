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
    justifyContent: 'center'
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  title: {
    fontSize: scaledSize(20),
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'left'
  },
  subCategoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categotyItemContainer: {
    width: width * 0.42,
    height: width * 0.21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.grayText,
    borderRadius: 5,
    marginTop: 15
  },
  serviceItemContainer: {

    width: width * 0.42,
    height: width * 0.21,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.grayText,
    borderRadius: 5,
    marginTop: 15
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
    width: '100%',
  },
  subCategoryTitle: {
    fontWeight: 'bold',
    fontSize: scaledSize(20),
    color: colors.textWhite,
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
