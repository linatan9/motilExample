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
  avatar: {
    width: scaledSize(60),
    height: scaledSize(60),
    borderRadius: scaledSize(30),
    backgroundColor: colors.bgLight,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  userData: {
    flexDirection: 'column',
    flex: 1,
    marginLeft: 15
  },
  userName: {
    color: colors.textWhite,
    fontSize: scaledSize(22),
    fontWeight: 'bold'
  },
  userPhone: {
    color: colors.textWhite,
    fontSize: scaledSize(14)
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rating: {
    color: colors.textWhite,
    fontSize: scaledSize(20),
    marginRight: 10,
  }
});
