import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import SettingItem from './components/SettingItem/SettingItem';
import SplashScreen from 'react-native-splash-screen';
import {scaledHeight} from '../../../constants/globalStyles';
import RNExitApp from 'react-native-exit-app';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export const Settings = props => {
  const availabilityItemsData = [
    {
      title: translate('settingsNavigation.general'),
      routeName: 'GeneralSettings',
    },
    {
      title: translate('settingsNavigation.onboarding'),
      routeName: 'OnboardingSettings',
    },
    {
      title: translate('settingsNavigation.mySchedule'),
      routeName: 'ScheduleSummary',
    },
    {
      title: translate('settingsNavigation.chooseCategoriesAndServices'),
      routeName: 'Categories',
    },
    {
      title: translate('settingsNavigation.contact'),
      routeName: 'ContactSettings',
    },
  ];
  useEffect(() => {
    const backAction = e => {
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
  useLayoutEffect(() => {
    SplashScreen.hide();
  }, []);

  const onLogout = () => {
    props.logOut();
    props.navigation.reset({
      routes: [{name: 'SignIn'}],
    });
    props.navigation.navigate('AuthNavigation');
  };

  return (
    <ScreenContainer>
      <View style={styles.userDataRow}>
        {props.user?.specialistProfile.photo ? (
          <Image
            style={styles.avatar}
            source={{
              uri: props.user?.specialistProfile.photo,
            }}
          />
        ) : (
          <View style={styles.avatar}>
            <icons.AvatarIcon height={scaledHeight(35)} />
          </View>
        )}
        <View style={styles.userData}>
          <Text style={styles.userName}>
            {props.user?.firstName} {props.user?.lastName}
          </Text>
          <Text style={styles.userPhone}>{props.user?.phone}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>5.0</Text>
          <icons.StarIcon color={colors.yellow} />
        </View>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={availabilityItemsData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => <SettingItem key={index} {...item} />}
        keyExtractor={item => item.title}
      />
      <DefaultButton
        title={translate('settingsNavigation.logOut')}
        onPress={onLogout}
        containerStyle={{marginTop: 10}}
      />
    </ScreenContainer>
  );
};

export default Settings;
