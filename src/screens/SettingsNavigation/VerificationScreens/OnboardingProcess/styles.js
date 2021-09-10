import {StyleSheet, Dimensions} from 'react-native';

import {
  scaledSize,
} from '../../../../constants/globalStyles';
import colors from "../../../../constants/colors";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  welcomeText: {
    width: '100%',
    textAlign: 'left',
    color: colors.textWhite,
    fontWeight: 'bold',
    fontSize: scaledSize(19),
  },
  title: {
    color: colors.textWhite,
    width: '100%',
    textAlign: 'left',
    marginTop: 10
  }
});
