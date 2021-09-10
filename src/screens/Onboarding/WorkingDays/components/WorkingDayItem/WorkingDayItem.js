import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {colors, icons} from "../../../../../constants/index";
import styles from './styles';
import CheckBox from 'react-native-elements/dist/checkbox/CheckBox';
import { capitalizeFirstLetter, workingHoursToIntervals } from '../../../../../constants/helpers';
import moment from 'moment';
import {translate} from '../../../../../i18n';

const WorkingDayItem = ({dayOfWeek, onEdit, onChangeDayOff, date}) => {
  const intervals = workingHoursToIntervals(dayOfWeek);
  console.log(intervals, 'intervalsintervalsintervalsintervalsintervals')
  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <CheckBox
          checked={!dayOfWeek.dayOff}
          checkedIcon={<icons.CheckedSquareCheckboxIcon height={30}/>}
          uncheckedIcon={<icons.UncheckedSquareCheckboxIcon height={30}/>}
          onPress={() => onChangeDayOff(dayOfWeek)}
          containerStyle={{
            backgroundColor: colors.bgLight,
            paddingTop: 0,
            borderWidth: 0,
            paddingLeft: 0,
            marginLeft: 0,
            padding: 0,
          }}
          textStyle={{
            color: colors.textWhite,
            fontWeight: 'normal',
          }}
        />
        <View style={styles.dayContainerDetails}>
          <View style={styles.dayTitleRow}>
            <Text style={styles.dayTitle}>{capitalizeFirstLetter(dayOfWeek.day)}</Text>
            {date && (<Text style={[styles.dayTitle, {marginLeft: 5}]}>{date}</Text>)}
          </View>
          <View>
            {
              !dayOfWeek.dayOff && intervals?.length ? (
                intervals.map((intr, i) => (
                  <View key={i} style={styles.timeRow}>
                    <Text style={styles.intervalText}>{moment(intr.timeFrom).format('HH:mm')}</Text>
                    <Text style={styles.intervalText} >{` - `}</Text>
                    <Text style={styles.intervalText}>{moment(intr.timeTo).format('HH:mm')}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.intervalText}>{translate('onboarding.workingDays.unavailable')}</Text>
              )
            }
          </View>
        </View>
      </View>
      {
        intervals?.length && !dayOfWeek.dayOff ? (<TouchableOpacity onPress={() => onEdit(intervals, dayOfWeek)} style={styles.editContainer}>
          <Text style={styles.editText}>{translate('edit')}</Text>
        </TouchableOpacity>) : null
      }
    </View>
  )
};

export default WorkingDayItem;
