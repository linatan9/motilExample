import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions, TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../constants";
import Carousel from 'react-native-snap-carousel';

import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { Calendar } from 'react-native-calendars';
import {translate} from '../../../i18n';
import { capitalizeFirstLetter } from '../../../constants/helpers';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const ChooseDateTime = (props) => {
  const [customerData, setCustomerData] = useState(props?.route?.params?.customerData);
  const pickedCustomer = props?.route?.params?.pickedCustomer;

  const [choosenDate, setChoosenDate] = useState({});
  const [availableTime, setAvailableTime] = useState({});
  const [time, setTime] = useState(null);

  const onDayPress = (day) => {
    props.getAvailability(day, props.user.id, customerData.duration).then(res => {
      setAvailableTime(res);
      const previousKey = Object.keys(choosenDate)[0];
      if (Object.keys(choosenDate).length && previousKey === day) {
        setChoosenDate({});
      } else if (Object.keys(choosenDate).length && previousKey !== day) {
        setChoosenDate({
          [day]: {
            selected: true, selectedColor: colors.yellow
          }
        })
      } else {
        setChoosenDate({
          [day]: {
            selected: true, selectedColor: colors.yellow
          }
        })
      }
    }).catch(e => console.log(e));
  };

  const onChangeTime = (newTime) => {
    if (newTime === time) {
      setTime(null);
      return;
    }
    setTime(newTime);
  };

  const onContinue = () => {
    const date = Object.keys(choosenDate).find(k => !!k);
    const newCustomerData = {...customerData, ...{timeStart: `${date} ${time}`}};
    props.navigation.navigate('NewTaskSummary', {customerData: newCustomerData, pickedCustomer: pickedCustomer});
  };

  return (
    <ScreenContainer>
      <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('newTaskNavigation.chooseDateTime.chooseDateTime')}/>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{width: '100%', flex: 1}}>
          <Calendar
            theme={{
              calendarBackground: colors.background,
              dayTextColor: colors.textWhite,
              selectedDayTextColor: colors.background,
              todayTextColor: colors.yellow,
              monthTextColor: colors.textWhite,
            }}
            onDayLongPress={(day) => onDayPress(day.dateString)}
            onDayPress={(day) => onDayPress(day.dateString)}
            markedDates={

              {...choosenDate}
            }
            style={styles.calendarContainerStyle}
            removeClippedSubviews={false}
            renderArrow={
              (direction) => direction === 'left' ? (<icons.HeaderArrowLeft height={15} color={colors.textWhite}/>) : (<icons.ArrowRight height={16} color={colors.textWhite}/>)
            }
          />
        </View>
        <View style={styles.availablesContainer}>
          {
            choosenDate && Object.keys(availableTime).map((key, i) => (
              <View style={[styles.availablesColumnContainer, {marginRight: i === 0 || i === 1 ? 7 : 0}]}>
                <Text style={styles.availableSlotTitle}>{capitalizeFirstLetter(key)}</Text>
                {
                  availableTime[key].map(timeSlot =>
                    <TouchableOpacity onPress={() => onChangeTime(timeSlot.time)} style={[styles.timeSlotContainer, {backgroundColor: time === timeSlot.time ? colors.yellow : colors.bgLight}]}>
                      <Text style={[styles.timeSlotText, {color: time === timeSlot.time ? colors.mainText : colors.textWhite}]}>{timeSlot.time}</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
            ))
          }
        </View>
      </ScrollView>
      <DefaultButton
        disabled={!time}
        title={translate('newTaskNavigation.chooseDateTime.continue')}
        onPress={onContinue}
        containerStyle={{marginTop: 20}}
      />
    </ScreenContainer>
  );
};

export default ChooseDateTime;
