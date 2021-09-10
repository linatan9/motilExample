import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../constants';
import {header20Black, scaledHeight} from '../../constants/globalStyles';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.modalBackround,
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalBecksideContainer: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWindow: {
    marginHorizontal: windowWidth * 0.1,
    borderRadius: 15,
  },
  headerText: {
    ...header20Black,
    marginBottom: scaledHeight(10),
  },
});
