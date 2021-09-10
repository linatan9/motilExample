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
  loginText: {
    fontSize: scaledSize(26),
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'left',
    width: '100%'
  },
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    marginTop: 5,
  },
  newText: {
    color: colors.textWhite,
    fontSize: scaledSize(16),
  },
  signUpText: {
    color: colors.textWhite,
    fontWeight: 'bold',
    borderBottomColor: colors.textWhite,
    borderBottomWidth: 1,
    marginLeft: 5,
    fontSize: scaledSize(16),
  },
  forgotPasswordContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  forgotPasswordText: {
    borderBottomColor: colors.textWhite,
    borderBottomWidth: 1,
    color: colors.textWhite,
    fontSize: scaledSize(14),
  },
  socialRow: {
    width: '100%',
    flexDirection: 'row'
  },
  socialDevider: {
    width: 15,
  },
  containerKeyboard: {
    flexGrow: 1,
    width: '100%',
  },
  socilLogintitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  socialLoginTitle: {
    color: colors.textWhite
  }
});
