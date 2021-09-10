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
  addNewRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  addNewTest: {
    fontWeight: 'bold',
    color: colors.textWhite,
    marginLeft: 5,
  },
  orText: {
    color: colors.textWhite,
  },
  pickerContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.textWhite,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  picker: {
    height: 120,
  }
});
