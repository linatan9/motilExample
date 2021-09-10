/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import {colors, icons} from '../../../../../constants/index';
import styles from './styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {translate} from '../../../../../i18n';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const TimeItem = ({
  interval,
  index,
  onRemoveTimeInterval,
  onChangeInterval,
  wrongInterval,
}) => {
  const isIos = Platform.OS === 'ios';
  const [newInterval, setNewInterval] = useState(interval);
  const [isShowTimepicker, setIsShowTimepicker] = useState(false);
  const [isTimeFrom, setIsTimeFrom] = useState(false);
  const isInvalidFrom = wrongInterval && wrongInterval.isInvalidFrom;
  const isInvalidTo = wrongInterval && wrongInterval.isInvalidTo;
  console.log(222);
  useEffect(() => {
    setNewInterval(interval);
  }, [interval]);
  const onOpenPicker = isTimeFrom => {
    setIsTimeFrom(isTimeFrom);
    setIsShowTimepicker(true);
  };
  const onChange = newTimeValue => {
    if (!newTimeValue.nativeEvent.timestamp) {
      setIsShowTimepicker(false);
      return;
    }
    const copyNewInterval = {...newInterval};
    if (isTimeFrom) {
      copyNewInterval.timeFrom = newTimeValue.nativeEvent.timestamp;
      setNewInterval(copyNewInterval);
    } else {
      copyNewInterval.timeTo = newTimeValue.nativeEvent.timestamp;
      setNewInterval(copyNewInterval);
    }
    setIsShowTimepicker(false);
    onChangeInterval(copyNewInterval, index);
  };

  return (
    <View
      style={[
        {alignItems: 'center', width: '100%'},
        {marginTop: index === 0 ? 0 : 40},
      ]}>
      {index !== 0 && (
        <Text style={styles.additionalTimeTitle}>
          {translate('onboarding.workingHours.tellWhen')}
        </Text>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => onOpenPicker(true)}
          style={{alignItems: 'center'}}>
          <Text style={[styles.title, {marginTop: index === 0 ? 0 : 20}]}>
            {translate('onboarding.workingHours.workingFrom')}
          </Text>
          <View style={styles.timeContainer}>
            <View
              style={[
                styles.timeValueContainer,
                {borderColor: isInvalidFrom ? colors.red : colors.inactive},
              ]}>
              <Text
                style={[
                  styles.timeValueText,
                  {color: isInvalidFrom ? colors.red : colors.textWhite},
                ]}>
                {moment(newInterval.timeFrom).format('hh')}
              </Text>
            </View>
            <Text
              style={[
                styles.dots,
                {color: isInvalidFrom ? colors.red : colors.textWhite},
              ]}>
              :
            </Text>
            <View
              style={[
                styles.timeValueContainer,
                {borderColor: isInvalidFrom ? colors.red : colors.inactive},
              ]}>
              <Text
                style={[
                  styles.timeValueText,
                  {color: isInvalidFrom ? colors.red : colors.textWhite},
                ]}>
                {moment(newInterval.timeFrom).format('mm')}
              </Text>
            </View>
            <Text
              style={[
                styles.timeFormat,
                {color: isInvalidFrom ? colors.red : colors.textWhite},
              ]}>
              {moment(newInterval.timeFrom).format('a')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, {marginTop: 35}]}>
        <TouchableOpacity
          onPress={() => onOpenPicker(false)}
          style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            {translate('onboarding.workingHours.workingTo')}
          </Text>
          <View style={styles.timeContainer}>
            <View
              style={[
                styles.timeValueContainer,
                {borderColor: isInvalidTo ? colors.red : colors.inactive},
              ]}>
              <Text
                style={[
                  styles.timeValueText,
                  {color: isInvalidTo ? colors.red : colors.textWhite},
                ]}>
                {moment(newInterval.timeTo).format('hh')}
              </Text>
            </View>
            <Text
              style={[
                styles.dots,
                {color: isInvalidTo ? colors.red : colors.textWhite},
              ]}>
              :
            </Text>
            <View
              style={[
                styles.timeValueContainer,
                {borderColor: isInvalidTo ? colors.red : colors.inactive},
              ]}>
              <Text
                style={[
                  styles.timeValueText,
                  {color: isInvalidTo ? colors.red : colors.textWhite},
                ]}>
                {moment(newInterval.timeTo).format('mm')}
              </Text>
            </View>
            <Text
              style={[
                styles.timeFormat,
                {color: isInvalidTo ? colors.red : colors.textWhite},
              ]}>
              {moment(newInterval.timeTo).format('a')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {index !== 0 && (
        <TouchableOpacity
          style={styles.deleteIcons}
          onPress={() => onRemoveTimeInterval(index)}>
          <icons.Trash color={colors.red} />
        </TouchableOpacity>
      )}

      {isShowTimepicker && (
        <DateTimePicker
          style={
            isIos
              ? {
                  bottom: 0,
                  position: 'absolute',
                  height: 150,
                  width: width,
                  backgroundColor: colors.background,
                }
              : {}
          }
          testID="dateTimePicker"
          value={isTimeFrom ? newInterval.timeFrom : newInterval.timeTo}
          mode={'time'}
          is24Hour={true}
          display={isIos ? 'spinner' : 'default'}
          themeVariant="dark"
          onChange={onChange}
          minuteInterval={30}
        />
      )}
    </View>
  );
};

export default TimeItem;
