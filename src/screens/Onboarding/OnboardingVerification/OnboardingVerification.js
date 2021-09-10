/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Linking} from 'react-native';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {CheckBox} from 'react-native-elements';
import {ONBOARDING_SLUGS} from '../../../constants/data';
import {getNotificationBySlug} from '../../../constants/helpers';


export const OnboardingVerification = props => {
  const [verificationNotification, setVerificationNotification] = useState(
    getNotificationBySlug(
      props.specialistNotifications,
      ONBOARDING_SLUGS.SPECIALIST_BACKGROUND_CHECK,
    ),
  );

  const [isPending, setIsPending] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    setVerificationNotification(
      getNotificationBySlug(
        props.specialistNotifications,
        ONBOARDING_SLUGS.SPECIALIST_BACKGROUND_CHECK,
      ),
    );
  }, [props.specialistNotifications]);

  const onStartBackgroundChecker = () => {
    props
      .getBackgroundCheckerUrl()
      .then(async res => {
        props
          .setOnboardingProgress(ONBOARDING_SLUGS.SPECIALIST_BACKGROUND_CHECK)
          .then(async r => {
            if (res?.invitationUrl) {
              await props.getNotifications();
              setVerificationNotification(
                getNotificationBySlug(
                  props.specialistNotifications,
                  ONBOARDING_SLUGS.SPECIALIST_BACKGROUND_CHECK,
                ),
              );
              Linking.openURL(res.invitationUrl);
            }
          })
          .catch(e => console.log(e));
        // props.navigation.navigate('SherableSchedule')
      })
      .catch(e => console.log(e));
  };
  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate('onboarding.onboardingVerification.backgroundCheck')}
      />
      <DefaultButton
        title={translate('onboarding.onboardingVerification.start')}
        onPress={onStartBackgroundChecker}
      />
      <View style={styles.checkBoxContainer}>
        <CheckBox
          title={translate('onboarding.onboardingVerification.resultsPending')}
          checked={
            props.user.specialistProfile.checkrInvitationUrl &&
            verificationNotification
          }
          checkedIcon={<icons.CheckedCheckboxIcon height={20} />}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20} />}
          onPress={() => setIsPending(!isPending)}
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
        />
        <CheckBox
          title={translate(
            'onboarding.onboardingVerification.applicationProcesse',
          )}
          checked={!verificationNotification}
          checkedIcon={<icons.CheckedCheckboxIcon height={20} />}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20} />}
          onPress={() => setIsProcessed(!isProcessed)}
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
        />
      </View>
      <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
        <DefaultButton
          disabled={verificationNotification}
          title={translate('next')}
          onPress={() => props.navigation.navigate('SherableSchedule')}
        />
      </View>
    </ScreenContainer>
  );
};

export default OnboardingVerification;
