import {StyleSheet, Dimensions} from 'react-native';

import {fonts, colors} from '../../constants';
import {scaledSize, body16Regular} from '../../constants/globalStyles';

const widthScreen = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    padding: scaledSize(25),
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.background
  },
  verticalCenter: {
    justifyContent: 'center',
  }
});
