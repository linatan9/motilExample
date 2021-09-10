import {StyleSheet, Dimensions} from 'react-native';

import {fonts, colors} from '../../constants';
import {scaledSize, body16Regular} from '../../constants/globalStyles';

const widthScreen = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: scaledSize(19),
    fontWeight: 'bold',
    flex: 1,
    color: colors.textWhite,
    textAlign: 'center',
    flexWrap: 'nowrap'
  },
  actionIconContainerLeft: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  actionIconContainerRight: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});
