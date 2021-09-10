import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Picker,
} from 'react-native';
import {colors, icons} from "../../../constants";
import Carousel from 'react-native-snap-carousel';
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';

const iamgeSizeheight = Dimensions.get('window').width - 40;


export  const CompleteBooking = (props) => {

  // useLayoutEffect(() => {
  //   const timer = setTimeout(() => {
  //     props.navigation.navigate('CreateBooking');
  //     return () => clearTimeout(timer);
  //   }, 2000);
  // }, []);
  return (
      <ScreenContainer verticalCenter>
        <icons.DoubleIconCHeck/>
        <Text style={styles.title}>{translate('newTaskNavigation.completeBooking.bookingComplete')}</Text>
        <DefaultButton
          title={translate('passwordComponent.ok')}
          onPress={() => props.navigation.navigate('CreateBooking', {isCreateSuccess: true})}
          containerStyle={{marginTop: 20}}
        />
      </ScreenContainer>
  );
};

export default CompleteBooking;
