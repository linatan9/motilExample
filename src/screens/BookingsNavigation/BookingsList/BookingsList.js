import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Linking,
  Platform,
  BackHandler,
} from 'react-native';
import {colors, icons} from '../../../constants';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import moment from 'moment';
import BookingItem from './components/BookingItem/BookingItem';
import BookingItemsDateContainer from './components/BookingItemsDateContainer/BookingItemsDateContainer';
import {
  BOOKING_STATUSES,
  BOOKINGS_TABS,
  CONNECTS_TYPE,
} from '../../../constants/data';
import BookingTabs from './components/BookingTabs/BookingTabs';
import BackdropModalContainer from '../../../components/BackdropModalContainer/BackdropModalContainer';
import SocialModal from './components/SocialModal/SocialModal';
import SocialButton from './components/SocialButton/SocialButton';
import {translate} from '../../../i18n';
import RNExitApp from 'react-native-exit-app';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export const BookingsList = props => {
  const [openBookingId, setOpenBookingId] = useState(null);
  const [openDateBookings, setOpenDateBookings] = useState([]);
  const [activeTab, setActiveTab] = useState(BOOKINGS_TABS.UPCOMING);
  const [isShowCallModal, setIsShowCallModal] = useState(false);
  const [isShowMsgModal, setIsShowMsgModal] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [customerForConnect, setCustomerForConnect] = useState(null);

  useEffect(() => {
    const backAction = e => {
      console.log(e, 'EVENT');

      if (e?.data?.action?.type === 'POP') {
        if (Platform.OS === 'ios') {
          RNExitApp.exitApp();
        } else {
          BackHandler.exitApp();
        }
        e.preventDefault();
      }
    };
    const listern = props.navigation.addListener('beforeRemove', backAction);
    return () => listern('beforeRemove', backAction);
  }, []);

  const onExpandBooking = bookingId => {
    if (openBookingId === bookingId) {
      setOpenBookingId(null);
      return;
    }
    setOpenBookingId(bookingId);
  };

  useLayoutEffect(() => {
    setOpenDateBookings([]);
    setBookingList([]);
    const methodName =
      activeTab === BOOKINGS_TABS.UPCOMING
        ? 'getUpcomingsTasks'
        : 'getHistoryTasks';
    props[methodName]()
      .then(res => {
        const grouped = {};
        const dates = [];
        res.map(b => {
          const date = moment(b.timeStart, 'YYYY-MM-DD hh:mm a').format(
            'YYYY-MM-DD',
          );
          if (!grouped[date]) {
            grouped[date] = [];
            grouped[date].push(b);
            dates.push(date);
          } else {
            grouped[date].push(b);
          }
        });
        console.log(grouped, 'GROUPED');

        setOpenDateBookings(dates);
        setBookingList(grouped);
      })
      .catch(e => console.log(e));
  }, [activeTab]);

  const getFacebookId = customer => {
    return customer?.uid;
  };

  const onExpandDateBookings = date => {
    const copyDates = [...openDateBookings];
    if (copyDates.includes(date)) {
      const idx = copyDates.indexOf(date);
      copyDates.splice(idx, 1);
      setOpenDateBookings(copyDates);
    } else {
      copyDates.push(date);
      setOpenDateBookings(copyDates);
    }
  };

  const onChangeStatus = (taskId, status, isPositiveFlow) => {
    console.log(taskId, status);
    let statusChangedTo;
    switch (status) {
      case BOOKING_STATUSES.ASSIGNED:
        statusChangedTo = isPositiveFlow
          ? BOOKING_STATUSES.ACCEPTED
          : BOOKING_STATUSES.DECLINE;
        break;
      case BOOKING_STATUSES.ACCEPTED:
        statusChangedTo = isPositiveFlow
          ? BOOKING_STATUSES.STARTED
          : BOOKING_STATUSES.CANCEL;
        break;
      case BOOKING_STATUSES.STARTED:
        statusChangedTo = isPositiveFlow
          ? BOOKING_STATUSES.SUCCESSFUL
          : BOOKING_STATUSES.FAILED;
        break;
    }
    props
      .changeTaskStatus(taskId, statusChangedTo)
      .then(async res => {
        props
          .getUpcomingsTasks()
          .then(res => {
            const grouped = {};
            const dates = [];
            res.map(b => {
              const date = moment(b.timeStart, 'YYYY-MM-DD hh:mm a').format(
                'YYYY-MM-DD',
              );
              if (!grouped[date]) {
                grouped[date] = [];
                grouped[date].push(b);
                dates.push(date);
              } else {
                grouped[date].push(b);
              }
            });
            setOpenDateBookings(dates);
            setBookingList(grouped);
            setOpenBookingId(null);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  };
  const openNavigtain = destionation => {
    try {
      Geolocation.getCurrentPosition(
        pos => {
          const iosUrl = `maps://app?saddr=${pos.coords.latitude},${pos.coords.longitude}&daddr=${destionation.lat},${destionation.lng}&travelmode=driving`;
          const androidUrl = `google.navigation:q=${destionation.lat},${destionation.lng}&travelmode=driving`;
          console.log(pos, ' POS===========');
          Linking.canOpenURL(androidUrl)
            .then(() => {
              Linking.openURL(androidUrl);
            })
            .catch(() => {
              Linking.openURL(iosUrl);
            });
        },
        err => console.log(err),
        {timeout: 10000, maximumAge: 0, enableHighAccuracy: false},
      );
    } catch (e) {
      alert(`Can't fetch location`);
    }
  };

  const checkLocationPermission = coord => {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
            openNavigtain(coord);
          } else {
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(newResult => {
              if (newResult === RESULTS.GRANTED || result === RESULTS.LIMITED) {
                openNavigtain(coord);
              }
            });
          }
        })
        .catch(error => {
          console.log(error, ' ERORO ACCESS LOCARTION IOS');
        });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
            openNavigtain(coord);
          } else {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
              newResult => {
                if (
                  newResult === RESULTS.GRANTED ||
                  result === RESULTS.LIMITED
                ) {
                  openNavigtain(coord);
                }
              },
            );
          }
        })
        .catch(error => {
          console.log(error, ' ERORO ACCESS LOCARTION IOS');
        });
    }
  };

  const onMsgModal = (status, customer) => {
    setIsShowMsgModal(status);
    setCustomerForConnect(customer);
  };

  console.log(getFacebookId(customerForConnect));

  return (
    <ScreenContainer>
      <MainHeader
        isNoBackArrow
        onLeftIconClick={props.navigation.goBack}
        title={translate('bookingsNavigation.bookingsList.bookings')}
        rightIcon={<icons.Notifications />}
        onRightIconClick={() => props.navigation.navigate('Notifications')}
      />
      <BookingTabs activeTab={activeTab} onChange={setActiveTab} />
      <FlatList
        style={{width: '100%'}}
        data={
          activeTab === BOOKINGS_TABS.UPCOMING
            ? Object.keys(bookingList)
            : Object.keys(bookingList)
        }
        listKey={'datesList'}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <BookingItemsDateContainer
            date={item}
            isOpen={openDateBookings.includes(item)}
            onExpand={onExpandDateBookings}>
            <FlatList
              scrollEnabled={false}
              listKey={'bookingList'}
              style={{width: '100%'}}
              data={
                activeTab === BOOKINGS_TABS.UPCOMING
                  ? bookingList[item]
                  : bookingList[item]
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <BookingItem
                  onShowCallModal={customer => setIsShowCallModal(true)}
                  onShowMsgModal={customer => onMsgModal(true, customer)}
                  key={index}
                  {...item}
                  isOpen={item.id === openBookingId}
                  onExpand={onExpandBooking}
                  isHistory={activeTab === BOOKINGS_TABS.HISTORY}
                  onChangeStatus={onChangeStatus}
                  onOpenNavigation={coord => checkLocationPermission(coord)}
                />
              )}
              keyExtractor={item => item.name}
            />
          </BookingItemsDateContainer>
        )}
        keyExtractor={item => item.name}
      />
      <BackdropModalContainer
        showModal={isShowCallModal}
        modalHeaderText={translate('bookingsNavigation.bookingsList.test')}
        onHideModal={() => setIsShowCallModal(false)}>
        <SocialModal
          title={translate('bookingsNavigation.bookingsList.selectCallMethod')}>
          <>
            <SocialButton
              type={CONNECTS_TYPE.WHATS_APP}
              onPress={() => setIsShowCallModal(false)}
              title={translate('bookingsNavigation.bookingsList.whatsapp')}
              icon={<icons.WhatsApp color={colors.textWhite} />}
              phone={customerForConnect?.phone}
              facebookId={getFacebookId(customerForConnect)}
            />
            <SocialButton
              type={CONNECTS_TYPE.FACEBOOK}
              onPress={() => setIsShowCallModal(false)}
              title={translate('bookingsNavigation.bookingsList.messenger')}
              icon={<icons.Messanger color={colors.textWhite} />}
              phone={customerForConnect?.phone}
              facebookId={getFacebookId(customerForConnect)}
            />
            <SocialButton
              type={CONNECTS_TYPE.PHONE}
              onPress={() => setIsShowCallModal(false)}
              title={translate('bookingsNavigation.bookingsList.phoneCall')}
              icon={<icons.PhoneIcon color={colors.textWhite} />}
              phone={customerForConnect?.phone}
              facebookId={getFacebookId(customerForConnect)}
            />
          </>
        </SocialModal>
      </BackdropModalContainer>
      <BackdropModalContainer
        showModal={isShowMsgModal}
        modalHeaderText={translate('bookingsNavigation.bookingsList.test')}
        onHideModal={() => onMsgModal(false, null)}>
        <SocialModal
          title={translate('bookingsNavigation.bookingsList.selectChat')}>
          <>
            <SocialButton
              isMessage
              type={CONNECTS_TYPE.WHATS_APP}
              onPress={() => onMsgModal(false, null)}
              title={translate('bookingsNavigation.bookingsList.whatsapp')}
              icon={<icons.WhatsApp color={colors.textWhite} />}
              phone={customerForConnect?.phone}
              facebookId={getFacebookId(customerForConnect)}
            />
            <SocialButton
              isMessage
              type={CONNECTS_TYPE.FACEBOOK}
              onPress={() => onMsgModal(false, null)}
              title={translate('bookingsNavigation.bookingsList.messenger')}
              icon={<icons.Messanger color={colors.textWhite} />}
              phone={customerForConnect?.phone}
              facebookId={getFacebookId(customerForConnect)}
            />
            <SocialButton
              isMessage
              type={CONNECTS_TYPE.PHONE}
              onPress={() => onMsgModal(false, null)}
              title={translate('bookingsNavigation.bookingsList.sms')}
              icon={<icons.MessageIcon color={colors.textWhite} />}
              phone={customerForConnect?.phone}
              facebookId={getFacebookId(customerForConnect)}
            />
          </>
        </SocialModal>
      </BackdropModalContainer>
    </ScreenContainer>
  );
};

export default BookingsList;
