/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors, icons} from '../../../../../constants';

import styles from './styles';
import {
  BOOKING_STATUSES,
  STATUS_COLOR_MAP,
} from '../../../../../constants/data';
import {translate} from '../../../../../i18n';
import moment from 'moment';
import {capitalizeFirstLetter} from '../../../../../constants/helpers';

const BookingItem = ({
  address,
  amount,
  customer,
  id,
  isCharged,
  service,
  status,
  timeEnd,
  timeStart,
  onChangeStatus,
  onOpenNavigation,
  isOpen,
  onExpand,
  onShowCallModal,
  onShowMsgModal,
  isHistory,
}) => {
  console.log(customer);
  const isCompleted = status === BOOKING_STATUSES.SUCCESSFUL;
  const formattedAddress = `${address.apartment} ${address.street}, ${address.city}, ${address.region}`;

  return (
    <View
      style={[
        styles.container,
        {borderColor: isOpen ? colors.secondaryYellow : colors.lightGrayBorder},
      ]}>
      <View style={styles.infoRow}>
        {customer && (
          <Text
            style={
              styles.userName
            }>{`${customer.firstName} ${customer.lastName}`}</Text>
        )}
        {isHistory ? (
          <Text style={styles.userName}>${amount}</Text>
        ) : (
          <TouchableOpacity style={{padding: 5}} onPress={() => onExpand(id)}>
            {isOpen ? <icons.ArrowUpBold /> : <icons.ArrowDownBold />}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.title}>{service.name}</Text>
        {!isHistory && <Text style={styles.userName}>${amount}</Text>}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.title}>{`${moment(
          timeStart,
          'YYYY-MM-DD hh:mm a',
        ).format('HH:mm a')} - ${moment(timeEnd, 'YYYY-MM-DD hh:mm a').format(
          'HH:mm a',
        )}`}</Text>
        {/*{!isCompleted && <Text style={[styles.title, {paddingBottom: 5}]}>{distance}</Text>}*/}
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.title}>{formattedAddress}</Text>
        {/*{!isHistory && <icons.Location/>}*/}
        <TouchableOpacity
          onPress={() => onOpenNavigation(address.coordination)}>
          <icons.Location />
        </TouchableOpacity>
      </View>
      {isHistory && (
        <View style={styles.infoRow}>
          <Text style={styles.title}>
            {translate('bookingsNavigation.bookingsList.bookingItem.status')}:{' '}
          </Text>
          {isCompleted ? (
            <Text
              style={[styles.statusText, {color: STATUS_COLOR_MAP[status]}]}>
              {translate(
                'bookingsNavigation.bookingsList.bookingItem.completed',
              )}
              ,{' '}
              {isCharged
                ? translate('bookingsNavigation.bookingsList.bookingItem.paid')
                : ''}
            </Text>
          ) : (
            <Text
              style={[styles.statusText, {color: STATUS_COLOR_MAP[status]}]}>
              {capitalizeFirstLetter(status.toLowerCase())}
            </Text>
          )}
        </View>
      )}
      {isOpen && (
        <>
          <View style={styles.infoRow}>
            <Text style={styles.title}>
              {translate('bookingsNavigation.bookingsList.bookingItem.status')}:{' '}
            </Text>
            <Text
              style={[styles.statusText, {color: STATUS_COLOR_MAP[status]}]}>
              {capitalizeFirstLetter(status.toLowerCase())}
            </Text>
          </View>
          <View style={[styles.infoRow, {marginTop: 10}]}>
            <TouchableOpacity
              onPress={() => onShowMsgModal(customer)}
              style={[
                styles.buttonContainer,
                {backgroundColor: colors.bgLight},
              ]}>
              <icons.MessageIcon color={colors.yellow} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onShowCallModal(customer)}
              style={[
                styles.buttonContainer,
                {backgroundColor: colors.bgLight},
              ]}>
              <icons.PhoneIcon color={colors.yellow} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <TouchableOpacity
              onPress={() => onChangeStatus(id, status, true)}
              style={[styles.buttonContainer]}>
              <Text style={styles.statusOkText}>
                {status === BOOKING_STATUSES.ASSIGNED
                  ? translate(
                      'bookingsNavigation.bookingsList.bookingItem.accept',
                    )
                  : status === BOOKING_STATUSES.ACCEPTED
                  ? translate(
                      'bookingsNavigation.bookingsList.bookingItem.start',
                    )
                  : translate(
                      'bookingsNavigation.bookingsList.bookingItem.successful',
                    )}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onChangeStatus(id, status, false)}
              style={[styles.buttonContainer]}>
              <Text style={styles.statusFailText}>
                {status === BOOKING_STATUSES.ASSIGNED
                  ? translate(
                      'bookingsNavigation.bookingsList.bookingItem.decline',
                    )
                  : status === BOOKING_STATUSES.ACCEPTED
                  ? translate(
                      'bookingsNavigation.bookingsList.bookingItem.cancel',
                    )
                  : translate(
                      'bookingsNavigation.bookingsList.bookingItem.fail',
                    )}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default BookingItem;
