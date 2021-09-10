import {StyleSheet} from 'react-native';

import {scaledHeight, scaledSize} from '../../../constants/globalStyles';
import colors from '../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: scaledSize(26),
    fontWeight: 'bold',
    color: colors.textWhite,
    textAlign: 'left',
    width: '100%',
  },
  signUpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
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
    margin: 10,
  },
  forgotPasswordText: {
    borderBottomColor: colors.inactive,
    borderBottomWidth: 1,
    color: colors.inactive,
    fontSize: scaledSize(16),
  },
  socialRow: {
    width: '100%',
    flexDirection: 'column',
  },
  socialDevider: {
    width: 15,
  },
  containerKeyboard: {
    flexGrow: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socilLogintitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    margin: 10,
  },
  socialLoginTitle: {
    color: colors.textWhite,
    marginTop: scaledHeight(5),
    marginBottom: scaledHeight(5),
  },
});
