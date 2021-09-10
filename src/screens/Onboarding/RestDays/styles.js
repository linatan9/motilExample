import { StyleSheet, Dimensions, View } from 'react-native';

import {
  scaledSize,
} from '../../../constants/globalStyles';
import colors from "../../../constants/colors";
import React from 'react';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.mainBG,
    padding: 20,
    justifyContent: 'space-between'
  },
  calendarContainerStyle: {
    backgroundColor: colors.background,
    width: '100%',
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  descriptionTitle: {
    color: colors.textWhite,
    fontSize: scaledSize(12),
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restDayIcon: {
    width: scaledSize(20),
    height: scaledSize(20),
    borderRadius: scaledSize(10),
    backgroundColor: colors.bgLight,
    marginRight: 10,
  },
  currentDayIcon: {
    width: scaledSize(20),
    height: scaledSize(20),
    borderRadius: scaledSize(10),
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.yellow,
  },
  choosenDayIcon: {
    width: scaledSize(20),
    height: scaledSize(20),
    borderRadius: scaledSize(10),
    marginRight: 10,
    backgroundColor: colors.yellow,
  },
});
