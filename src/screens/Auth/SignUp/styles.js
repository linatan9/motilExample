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
    marginTop: scaledHeight(5),
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
  },
  forgotPasswordText: {
    borderBottomColor: colors.textWhite,
    borderBottomWidth: 1,
    color: colors.textWhite,
    fontSize: scaledSize(14),
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
  },
  nameRor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  nameRorItem: {
    width: '45%',
  },
  socilLogintitleContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    margin: 15,
  },
  socialLoginTitle: {
    color: colors.textWhite,
    marginTop: scaledHeight(5),
    marginBottom: scaledHeight(5),
  },
});
