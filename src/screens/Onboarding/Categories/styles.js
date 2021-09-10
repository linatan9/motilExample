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
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  title: {
    fontSize: scaledSize(18),
    color: colors.textWhite,
    textAlign: 'center'
  },
  serviceMainTitle: {
    fontSize: scaledSize(18),
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
    width: width * 0.45,
    height: width * 0.23,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.grayText,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    paddingRight: 0,
    paddingTop: 0,
    position: 'relative',
    overflow: 'hidden'
  },
  categotyIconContainer: {
    flex: 0.65,
  },
  serviceItemContainer: {
    width: width * 0.45,
    height: width * 0.23,
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
    fontSize: scaledSize(18),
    color: colors.textWhite,
    marginTop: 10,
    flex: 1,
  },
  serviceTitle: {
    fontWeight: 'bold',
    fontSize: scaledSize(18),
    color: colors.textWhite,
    width: '100%'
  },
  serviceItemTitleContainer: {
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
  },
  serviceItemPriceContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  servicepriceText: {
    color: colors.textWhite
  }
});
