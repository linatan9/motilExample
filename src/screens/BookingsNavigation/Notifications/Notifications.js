import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity, FlatList,
  ScrollView
} from 'react-native';
import {colors, icons} from "../../../constants";

import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { SocialButton } from '../../../components/SocialButton/SocialButton';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import BookingItem from '../BookingsList/components/BookingItem/BookingItem';
import moment from 'moment';
import PaymentNotification from './components/PaymentNotification/PaymentNotification';
import VerifyAccountNotification from './components/VerifyAccountNotification/VerifyAccountNotification';
import OnboardingNotification from './components/OnboardingNotification/OnboardingNotification';
import {translate} from '../../../i18n';
import AsyncStorage from "@react-native-community/async-storage";
import { MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY, PUSH_NOTIFICATIONS_TYPES } from '../../../constants/data';
import WorkingDayItem from '../../Onboarding/WorkingDays/components/WorkingDayItem/WorkingDayItem';
import { checkOnboardingComplete } from '../../../constants/helpers';

const mockBooking = {
  userName: 'John Snow',
  service: 'Personal trainer',
  price: '37$',
  distance: '1.2m',
  time: '6:00 pm - 7:00 pm',
  address: '3310 Mary Street, Miami, Florida 33133',
  status: 'Assigned',
  customer: {
    firstName: 'Customer',
    lastName: 'Name',
  },
  date: moment().format('YYYY-MM-DD'),
  id: 124152342345654,
};

export  const Notifications = (props) => {
  const [openBookingId, setOpenBookingId] = useState(null);
  const [isCompleteOnboarding, setIsCompleteOnboarding] = useState(checkOnboardingComplete(props.specialistNotifications));
  const [notifications, setNotifications] = useState([]);
  const onExpandBooking = (bookingId) => {
    if (openBookingId === bookingId) {
      setOpenBookingId(null);
      return;
    }
    setOpenBookingId(bookingId);
  };

  useEffect(() => {
    setIsCompleteOnboarding(checkOnboardingComplete(props.specialistNotifications));
  }, [props.specialistNotifications]);

  useLayoutEffect(() => {
    AsyncStorage.getItem(MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY).then((currentMessages) => {
      if(currentMessages) {
        setNotifications(JSON.parse(currentMessages));
        console.log(JSON.parse(currentMessages), 'JSON.parse(currentMessages)')
      }
    })
  }, []);

  const onClearNotifications = async () => {
    await AsyncStorage.removeItem(MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY);
    setNotifications([]);
  };

  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate('bookingsNavigation.notifications.notifications')}
        rightButton={(
          <TouchableOpacity onPress={onClearNotifications} style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={{fontWeight: 'bold', color: colors.textWhite}}>{translate('bookingsNavigation.notifications.clearAll')}</Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  style={{flex: 1, width: '100%'}}
      >
        {
          isCompleteOnboarding && (<OnboardingNotification/>)
        }
        {
          notifications.map((item ,index) => (
            item.type === PUSH_NOTIFICATIONS_TYPES.SPECIALIST_GOT_PAID ? (
              <PaymentNotification key={index} notification={item}/>
            ) : item.type === PUSH_NOTIFICATIONS_TYPES.SPECIALIST_CHECKR_VERIFIED ? (
              <VerifyAccountNotification key={index}/>
            ) : item.type === PUSH_NOTIFICATIONS_TYPES.SPECIALIST_NEW_TASK ? (
              <BookingItem isHistory key={item.userName} {...item} isOpen={item.id === openBookingId} onExpand={onExpandBooking}/>
            ) :  null
          ))
        }
      </ScrollView>

    </ScreenContainer>
  );
};

export default Notifications;
