import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Dimensions, FlatList} from 'react-native';
import {colors, icons} from '../../../constants';
import Carousel from 'react-native-snap-carousel';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import TimeItem from './components/TimeItem/TimeItem';
import SettingItem from '../../SettingsNavigation/Settings/components/SettingItem/SettingItem';
import moment from 'moment';
import {
  intervalsToWorkingHours,
  workingHoursToIntervals,
} from '../../../constants/helpers';

const iamgeSizeheight = Dimensions.get('window').width - 40;

const defauleTImeValue = {
  timeFrom: moment().set({hours: 9, minutes: 0}).toDate(),
  timeTo: moment().set({hours: 18, minutes: 0}).toDate(),
};

export const WorkingHours = props => {
  const intervalsForEdit = props?.route?.params?.intervals;
  const isFromSummaryPage = props?.route?.params?.isFromSummaryPage;
  const certainDateEdit = props?.route?.params?.certainDateEdit;
  const dayOfWeek = props?.route?.params?.dayOfWeek;
  const [timeIntervals, setTimeIntervals] = useState(
    intervalsForEdit || [defauleTImeValue],
  );
  const [wrongIntervals, setWrongIntervals] = useState([]);
  console.log(
    timeIntervals,
    'timeIntervalstimeIntervals==========',
    certainDateEdit,
  );

  useEffect(() => {
    if (
      props.workingDays &&
      Object.keys(props.workingDays).length &&
      !intervalsForEdit
    ) {
      const existIntervals = workingHoursToIntervals(props.workingDays);
      checkTimeIntervals(existIntervals);
      setTimeIntervals(existIntervals);
      console.log(existIntervals, 'existIntervalsexistIntervalsexistIntervals');
    }
  }, [props.workingDays]);

  const onAddNewInterval = () => {
    const copyIntervals = [...timeIntervals];
    copyIntervals.push(defauleTImeValue);
    checkTimeIntervals(copyIntervals);
    setTimeIntervals(copyIntervals);
  };

  const onRemoveTimeInterval = intervalIndex => {
    const copyIntervals = [...timeIntervals];
    copyIntervals.splice(intervalIndex, 1);
    checkTimeIntervals(copyIntervals);
    setTimeIntervals(copyIntervals);
  };
  const onChangeIntervalTime = (newInterval, index) => {
    let copyIntervals = [...timeIntervals];
    copyIntervals[index] = newInterval;
    setTimeIntervals(copyIntervals);
    checkTimeIntervals(copyIntervals);
  };

  const checkTimeIntervals = newIntervals => {
    const copyWrongIntervals = [];
    for (let i = 0; i < newIntervals.length; i++) {
      const nextTimeInterval = newIntervals[i + 1];
      if (
        moment(newIntervals[i].timeFrom).isAfter(newIntervals[i].timeTo) ||
        moment(newIntervals[i].timeFrom).isSame(newIntervals[i].timeTo)
      ) {
        copyWrongIntervals.push({
          index: i,
          isInvalidFrom: true,
          isInvalidTo: true,
        });
      } else if (
        !!nextTimeInterval &&
        moment(newIntervals[i].timeTo).isAfter(nextTimeInterval.timeFrom)
      ) {
        copyWrongIntervals.push(
          {
            index: i,
            isInvalidFrom: false,
            isInvalidTo: true,
          },
          {
            index: i + 1,
            isInvalidFrom: true,
            isInvalidTo: false,
          },
        );
      } else if (
        nextTimeInterval &&
        moment(newIntervals[i].timeTo).isSame(nextTimeInterval.timeFrom)
      ) {
        copyWrongIntervals.push(
          {
            index: i,
            isInvalidFrom: false,
            isInvalidTo: true,
          },
          {
            index: i + 1,
            isInvalidFrom: true,
            isInvalidTo: false,
          },
        );
      }
    }
    setWrongIntervals(copyWrongIntervals);
  };

  const onSave = () => {
    const workingHours = intervalsToWorkingHours(
      timeIntervals,
      dayOfWeek,
      certainDateEdit,
    );
    console.log(workingHours, 'workingHoursworkingHoursworkingHours');
    if (certainDateEdit) {
      const copyWorkingHours = {...workingHours, ...{date: certainDateEdit}};
      delete copyWorkingHours.day;
      props
        .setCertainDateSchedule(copyWorkingHours)
        .then(res => {
          props.navigation.navigate(
            certainDateEdit ? 'RestDays' : 'WorkingDays',
            {certainDateEdit: certainDateEdit},
          );
        })
        .catch(e => console.log(e));
    } else if (intervalsForEdit) {
      console.log(workingHours, 'workingHoursworkingHoursworkingHours');
      props
        .changeDaySchedule(workingHours)
        .then(res => {
          props.navigation.navigate(
            isFromSummaryPage ? 'ScheduleSummary' : 'WorkingDays',
          );
        })
        .catch(e => console.log(e));
    } else {
      props
        .setWorkingHours(workingHours)
        .then(res => {
          props.navigation.navigate(
            isFromSummaryPage ? 'ScheduleSummary' : 'WorkingDays',
          );
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <ScreenContainer>
      <Text style={styles.stepTitle}>{`${translate('step')} 2`}</Text>
      <Text style={styles.subTitle}>
        {translate('onboarding.workingHours.tellWhen')}
      </Text>
      <MainHeader
        isNoBackArrow={isFromSummaryPage}
        onLeftIconClick={props.navigation.goBack}
        title={'Set working hours'}
      />
      <FlatList
        style={{width: '100%', paddingBottom: 20}}
        data={timeIntervals}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TimeItem
            wrongInterval={wrongIntervals.find(wi => wi.index === index)}
            onChangeInterval={onChangeIntervalTime}
            onRemoveTimeInterval={onRemoveTimeInterval}
            index={index}
            key={index}
            interval={item}
          />
        )}
        keyExtractor={item => item.title}
      />
      <DefaultButton
        disabled={!!wrongIntervals.length}
        onPress={onAddNewInterval}
        isGray
        title={translate('onboarding.workingHours.additionalTimePeriod')}
        containerStyle={{marginTop: 20}}
      />
      <DefaultButton
        disabled={!!wrongIntervals.length}
        onPress={onSave}
        title={translate('save')}
        containerStyle={{marginTop: 10}}
      />
    </ScreenContainer>
  );
};

export default WorkingHours;
