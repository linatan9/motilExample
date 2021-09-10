import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../constants/globalStyles';
import colors from "../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.mainBG,
    justifyContent: 'center'
  },
  dotStyle: {
    height: 8,
    width: 8,
    backgroundColor: colors.grayText,
  },
  activeDotStyle: {
    width: 20,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.yellow,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.mainMediumGreen
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: scaledSize(26),
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: 20
  },
  subtitle: {
    fontSize: scaledSize(14),
    color: colors.textWhite,
    marginTop: 20
  },
  buttonCOntainer: {
    marginTop: scaledSize(50),
    width: '100%'
  },
  skipText: {
    color: colors.grayText
  },
  skipContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  }
});
