/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking,
  AppState,
  Platform,
} from 'react-native';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {CheckBox} from 'react-native-elements';
import {
  CALLBACK_LINK_FOR_STRIPE,
  ONBOARDING_SLUGS,
  STRIPE_CLIENT_DEV,
} from '../../../constants/data';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {getNotificationBySlug} from '../../../constants/helpers';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export const OnboardPaymentAccount = props => {
  const [paymentNotification, setPaymentNotification] = useState(
    getNotificationBySlug(
      props.specialistNotifications,
      ONBOARDING_SLUGS.SPECIALIST_SETUP_STRIPE,
    ),
  );
  console.log(paymentNotification, 'paymentNotificationpaymentNotification');
  const getStripeUrl = () => {
    const {email, phone, firstName, lastName} = props.user.user;
    return `https://connect.stripe.com/express/oauth/authorize?redirect_uri=${CALLBACK_LINK_FOR_STRIPE.prefixes[0]}&client_id=${STRIPE_CLIENT_DEV}&&stripe_user[email]=${email}&stripe_user[country]=US&stripe_user[phone]=${phone}&stripe_user[first_name]=${firstName}&stripe_user[last_name]=${lastName}&state=${props.user.token}`;
  };

  useEffect(() => {
    setPaymentNotification(
      getNotificationBySlug(
        props.specialistNotifications,
        ONBOARDING_SLUGS.SPECIALIST_SETUP_STRIPE,
      ),
    );
  }, [props.specialistNotifications]);

  const onSetupAccount = async () => {
    const stripeUrl =
      Platform.OS === 'ios' ? encodeURI(getStripeUrl()) : getStripeUrl();
    console.log(stripeUrl, '=====URL');

    if (await InAppBrowser.isAvailable()) {
      InAppBrowser.open(stripeUrl, {
        // iOS Properties
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: colors.background,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: colors.background,
        secondaryToolbarColor: 'black',
        navigationBarColor: 'black',
        navigationBarDividerColor: 'white',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${props.user.token}`,
        },
      }).then(res => {
        console.log(res, 'RES=====');
        props
          .getNotifications()
          .then(res => {})
          .catch();
      });
    }
  };

  const [isMoreInfo, setIsMoreInfo] = useState(false);
  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate('onboarding.onboardPaymentAccount.payouts')}
      />
      <DefaultButton
        disabled={!paymentNotification}
        title={translate('onboarding.onboardPaymentAccount.setupAccount')}
        onPress={onSetupAccount}
      />
      <View style={styles.checkBoxContainer}>
        <CheckBox
          title={translate('onboarding.onboardPaymentAccount.needMoreInfo')}
          checked={isMoreInfo}
          checkedIcon={<icons.CheckedCheckboxIcon height={20} />}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20} />}
          onPress={() => setIsMoreInfo(!isMoreInfo)}
          containerStyle={{
            backgroundColor: colors.background,
            borderWidth: 0,
            paddingLeft: 0,
            marginLeft: 0,
          }}
          textStyle={{
            color: colors.textWhite,
            fontWeight: 'normal',
          }}
          disabled
        />
        <CheckBox
          title={translate('completed')}
          checked={!paymentNotification}
          checkedIcon={<icons.CheckedCheckboxIcon height={20} />}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20} />}
          onPress={() => {}}
          containerStyle={{
            backgroundColor: colors.background,
            borderWidth: 0,
            paddingLeft: 0,
            marginLeft: 0,
          }}
          textStyle={{
            color: colors.textWhite,
            fontWeight: 'normal',
          }}
          disabled
        />
        <View style={styles.poweredContainer}>
          <Text style={styles.poweredText}>
            {translate('onboarding.onboardPaymentAccount.poweredBy')}
          </Text>
          <Text style={styles.stripteText}>STRIPE</Text>
        </View>
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
        <DefaultButton
          disabled={paymentNotification}
          title={translate('next')}
          onPress={() => props.navigation.navigate('OnboardingVerification')}
        />
      </View>
    </ScreenContainer>
  );
};

export default OnboardPaymentAccount;
