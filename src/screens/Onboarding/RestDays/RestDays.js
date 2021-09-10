/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {Calendar} from 'react-native-calendars';
import WorkingDayItem from '../WorkingDays/components/WorkingDayItem/WorkingDayItem';
import moment from 'moment';

const defaultTImeValue = [
  {
    dayTitle: 'Sunday',
    intervals: [],
    date: '2021-06-06',
    isWeekDay: true,
  },
  {
    dayTitle: 'Monday',
    intervals: ['07:00 am - 08:30 pm', '07:00 am - 08:30 pm'],
    date: '2021-06-07',
  },
  {
    date: '2021-06-09',
    dayTitle: 'Tuesday',
    intervals: ['07:00 am - 08:30 pm'],
  },
  {
    dayTitle: 'Wednesday',
    intervals: [
      '07:00 am - 08:30 pm',
      '07:00 am - 08:30 pm',
      '07:00 am - 08:30 pm',
    ],
    date: '2021-06-16',
  },
  {
    dayTitle: 'Thursday',
    intervals: ['07:00 am - 08:30 pm'],
    date: '2021-06-22',
  },
  {
    dayTitle: 'Friday',
    intervals: ['07:00 am - 08:30 pm'],
    date: '2021-06-21',
  },
  {
    dayTitle: 'Saturday',
    intervals: [],
    isWeekDay: true,
    date: '2021-06-23',
  },
];

export const RestDays = props => {
  const [chosenDate, setChosenDate] = useState({});
  const isFromSummaryPage = props?.route?.params?.isFromSummaryPage;
  const certainDateEdit = props?.route?.params?.certainDateEdit;
  const [calendarMonth, setCalendarMonth] = useState(
    moment().format('YYYY-MM'),
  );
  const daysOffNames = props.daysOfWeek
    .filter(dow => dow.dayOff)
    .map(dow => dow.day);
  const [dateDetails, setDateDetails] = useState(null);

  useEffect(() => {
    if (certainDateEdit) {
      props.getDateSchedule(certainDateEdit).then(res => {
        const dayOfWeek = moment(certainDateEdit).format('dddd');
        const copyResponse = {...res};
        copyResponse.day = dayOfWeek;
        setDateDetails(copyResponse);
        setChosenDate({
          [certainDateEdit]: {
            selected: true,
            selectedColor: colors.yellow,
          },
        });
      });
    }
  }, [certainDateEdit, props]);

  const onDayPress = day => {
    console.log(day, 'DAY');
    const dayOfWeek = moment(day).format('dddd');
    const previousKey = Object.keys(chosenDate)[0];
    if (Object.keys(chosenDate).length && previousKey === day) {
      setChosenDate({});
      setDateDetails(null);
    } else {
      props
        .getDateSchedule(day)
        .then(res => {
          const copyResponse = {...res};
          copyResponse.day = dayOfWeek;
          if (Object.keys(chosenDate).length && previousKey !== day) {
            setDateDetails(copyResponse);
            setChosenDate({
              [day]: {
                selected: true,
                selectedColor: colors.yellow,
              },
            });
          } else {
            setDateDetails(copyResponse);
            setChosenDate({
              [day]: {
                selected: true,
                selectedColor: colors.yellow,
              },
            });
          }
        })
        .catch(e => console.log(e));
    }
  };

  const onEditCertainDateSchedule = (intervals, dayOfWeek) => {
    props.navigation.navigate('WorkingHours', {
      intervals,
      dayOfWeek,
      certainDateEdit: dayOfWeek.date,
    });
  };

  const getMarkedObjectDates = specificDates => {
    const daysInMonth = moment(calendarMonth).daysInMonth();
    const datesObject = {};
    for (let i = 1; i <= daysInMonth; i++) {
      const day = i < 10 ? `0${i}` : i;
      const date = moment(`${calendarMonth}-${day}`);
      const dayOfWeek = date.format('dddd').toLowerCase();
      if (daysOffNames.includes(dayOfWeek)) {
        datesObject[date.format('YYYY-MM-DD')] = {
          selected: true,
          selectedColor: colors.bgLight,
        };
      }
    }
    if (specificDates && specificDates.length) {
      specificDates.forEach(sd => {
        if (sd.dayOff) {
          datesObject[sd.date] = {
            selected: true,
            selectedColor: colors.bgLight,
          };
        }
      });
    }
    return datesObject;
  };
  const onChangeDayOff = dayOfWeek => {
    const data = {
      date: dayOfWeek.date,
      dayOff: !dayOfWeek.dayOff,
    };
    props
      .setDayOffForCetainDate(data)
      .then(res => {
        setDateDetails({...dayOfWeek, ...{dayOff: !dayOfWeek.dayOff}});
      })
      .catch(e => console.log(e));
  };

  return (
    <ScreenContainer>
      <MainHeader
        isNoBackArrow={isFromSummaryPage}
        onLeftIconClick={props.navigation.goBack}
        title={translate('onboarding.restDays.restDays')}
      />
      <View style={{width: '100%', flex: 1}}>
        <Calendar
          onMonthChange={month => {
            setCalendarMonth(moment(month.dateString).format('YYYY-MM'));
            setChosenDate({});
            setDateDetails(null);
          }}
          hideExtraDays
          theme={{
            calendarBackground: colors.background,
            dayTextColor: colors.textWhite,
            selectedDayTextColor: colors.background,
            todayTextColor: colors.yellow,
            monthTextColor: colors.textWhite,
          }}
          onDayPress={day => onDayPress(day.dateString)}
          markedDates={{
            ...getMarkedObjectDates(props.specificDates),
            ...chosenDate,
          }}
          style={styles.calendarContainerStyle}
          removeClippedSubviews={false}
          renderArrow={direction =>
            direction === 'left' ? (
              <icons.HeaderArrowLeft height={15} color={colors.textWhite} />
            ) : (
              <icons.ArrowRight height={16} color={colors.textWhite} />
            )
          }
        />
        <View style={styles.descriptionRow}>
          <View style={styles.descriptionContainer}>
            <View style={styles.restDayIcon} />
            <Text style={styles.descriptionTitle}>
              {translate('onboarding.restDays.restDay')}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.currentDayIcon} />
            <Text style={styles.descriptionTitle}>
              {translate('onboarding.restDays.currentDay')}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <View style={styles.choosenDayIcon} />
            <Text style={styles.descriptionTitle}>
              {translate('onboarding.restDays.selected')}
            </Text>
          </View>
        </View>

        {dateDetails ? (
          <WorkingDayItem
            onEdit={onEditCertainDateSchedule}
            date={moment(dateDetails.date).format('MMM DD')}
            onChangeDayOff={onChangeDayOff}
            dayOfWeek={dateDetails}
          />
        ) : null}
      </View>
      <DefaultButton
        title={translate('next')}
        onPress={() => props.navigation.navigate('ScheduleSummary')}
      />
    </ScreenContainer>
  );
};

export default RestDays;
