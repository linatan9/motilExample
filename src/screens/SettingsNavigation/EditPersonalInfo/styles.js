import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledHeight,
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
  avatar: {
    width: scaledSize(80),
    height: scaledSize(80),
    borderRadius: scaledSize(40),
    backgroundColor: colors.bgLight,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIconAvatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scaledSize(24),
    height: scaledSize(24),
    backgroundColor: colors.yellow,
    borderRadius: scaledSize(12),
    position: 'absolute',
    bottom: -3,
    right: -3,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end'
  },
  authTextTitle: {
    width: '100%',
    textAlign: 'left',
    color: colors.textWhite,
    marginTop: 15,
  },
  facebookSocialContainer: {
    width: '100%',
    height: scaledHeight(70),
    backgroundColor: colors.bgLight,
    borderRadius: 10,
    padding: scaledHeight(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  facebookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facebookText: {
    marginLeft: 13,
    color: colors.textWhite,
    fontSize: scaledSize(18)
  },
  facebookConnectedText: {
    color: colors.green,
    fontSize: scaledSize(18)
  },
  facebookConnectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 5,
    borderColor: colors.textWhite,
    borderRadius: 5,
  },
  facebookConnectText: {
    color: colors.textWhite,
    fontSize: scaledSize(14)
  },
  containerKeyboard: {
    flexGrow: 1,
    width: '100%',
  },
});
