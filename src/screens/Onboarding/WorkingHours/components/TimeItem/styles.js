import {StyleSheet, Dimensions} from 'react-native';

import {scaledHeight, scaledSize} from '../../../../../constants/globalStyles';
import colors from '../../../../../constants/colors';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  title: {
    color: colors.textWhite,
    marginBottom: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValueContainer: {
    borderWidth: 0.5,
    borderColor: colors.inactive,
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    color: colors.textWhite,
    marginLeft: 10,
    marginRight: 10,
    fontSize: scaledSize(45),
  },
  timeValueText: {
    color: colors.textWhite,
    fontSize: scaledSize(35),
  },
  typeofDayContainer: {
    justifyContent: 'flex-end',
    right: width * 0.1,
    bottom: 0,
    position: 'absolute',
    zIndex: 100000,
  },
  typeOfDay: {
    fontSize: scaledSize(18),
    color: colors.textWhite,
  },
  additionalTimeTitle: {
    color: colors.textWhite,
    fontWeight: 'bold',
    marginTop: 30,
  },
  deleteIcons: {
    position: 'absolute',
    top: width * 0.36 + 70,
    right: width * 0.02,
    padding: 10,
  },
  timeFormat: {
    marginLeft: 10,
    fontSize: 14,
    alignSelf: 'flex-end',
    color: colors.textWhite,
  },
});
