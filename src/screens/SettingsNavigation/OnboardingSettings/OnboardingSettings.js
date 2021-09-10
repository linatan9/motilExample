import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {colors, icons} from '../../../constants';
import Carousel from 'react-native-snap-carousel';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {SCHEDULE_SUMMARY_ITEMS_NAMES} from '../../../constants/data';
import moment from 'moment';
import SplashScreen from 'react-native-splash-screen';
import {Icon} from 'react-native-elements';
import {scaledHeight} from '../../../constants/globalStyles';
import SettingItem from '../Settings/components/SettingItem/SettingItem';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export const OnboardingSettings = props => {
  const availabilityItemsData = [
    {
      title: translate(
        'settingsNavigation.onboardingSettings.onboardingProcess',
      ),
      routeName: 'OnboardingProcess',
    },
    {
      title: translate('settingsNavigation.onboardingSettings.watchIntroAgain'),
      routeName: 'Intro',
    },
    {
      title: translate('settingsNavigation.onboardingSettings.verification'),
      routeName: 'TrustedSpecialist',
    },
  ];
  const isAvatar = false;
  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate('settingsNavigation.onboarding')}
      />
      <FlatList
        style={{width: '100%'}}
        data={availabilityItemsData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => <SettingItem key={index} {...item} />}
        keyExtractor={item => item.title}
      />
    </ScreenContainer>
  );
};

export default OnboardingSettings;
