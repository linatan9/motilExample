/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Share, Dimensions} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import {getNotificationBySlug} from '../../../constants/helpers';
import {ONBOARDING_SLUGS} from '../../../constants/data';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export const SherableSchedule = props => {
  const [shareNotification, setPaymentNotification] = useState(
    getNotificationBySlug(
      props.specialistNotifications,
      ONBOARDING_SLUGS.SPECIALIST_SHARE_SCHEDULE,
    ),
  );
  const [linkValue, setLinkValue] = useState(
    `https://dev.motil.us/@${props.usersSlug}`,
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [updatedLinkView, setUpdatedLinkView] = useState(false);
  const onChangeLink = newLink => {
    if (errorMsg) {
      setErrorMsg('');
    }
    setLinkValue(newLink);
  };

  useEffect(() => {
    setPaymentNotification(
      getNotificationBySlug(
        props.specialistNotifications,
        ONBOARDING_SLUGS.SPECIALIST_SHARE_SCHEDULE,
      ),
    );
  }, [props.specialistNotifications]);

  useEffect(() => {
    if (shareNotification) {
      props
        .setOnboardingProgress(ONBOARDING_SLUGS.SPECIALIST_SHARE_SCHEDULE)
        .then(r => {})
        .catch(e => console.log(e));
    }
  }, [props, shareNotification]);

  const onShare = () => {
    Share.share({
      message: linkValue,
      url: linkValue,
    }).then(({action, activityType}) => {
      console.log('test', action, activityType);
      if (action === Share.sharedAction) {
        props
          .setOnboardingProgress(ONBOARDING_SLUGS.SPECIALIST_SHARE_SCHEDULE)
          .then(r => {
            Clipboard.setString(linkValue);
          })
          .catch(e => console.log(e));
      }
    });
  };

  const onSave = () => {
    props
      .shareLink(linkValue, ONBOARDING_SLUGS.SPECIALIST_SHARE_SCHEDULE)
      .then(() => {
        setUpdatedLinkView(true);
        console.log(updatedLinkView);
      })
      .catch(err => {
        setUpdatedLinkView(false);
        if (err?.data?.errors?.length) {
          err?.data?.errors.map(er => {
            if (er.message) {
              setErrorMsg(er.message);
            }
          });
        }
      });
  };

  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate('onboarding.sherableSchedule.shareableScheduleLink')}
      />
      <View style={{flex: 1}}>
        <Text style={styles.titleText1}>
          {translate('onboarding.sherableSchedule.copyAndShare')}
        </Text>
        <Text style={styles.titleText2}>
          {translate('onboarding.sherableSchedule.customersCan')}
        </Text>
        <DefaultInput
          placeholder={translate('password')}
          onChangeText={onChangeLink}
          label={translate('onboarding.sherableSchedule.yourScheduleLink')}
          invalidText={errorMsg}
          value={linkValue}
        />
        <Text style={updatedLinkView ? styles.successText : {display: 'none'}}>
          {translate('onboarding.sherableSchedule.updated')}
        </Text>
      </View>
      <DefaultButton
        isGray
        title={translate('onboarding.sherableSchedule.saveChanges')}
        onPress={onSave}
      />
      <DefaultButton
        isGray
        containerStyle={{marginTop: 10}}
        title={translate('onboarding.sherableSchedule.shareLink')}
        onPress={() => onShare()}
      />
      <DefaultButton
        disabled={shareNotification}
        containerStyle={{marginTop: 10}}
        title={translate('onboarding.sherableSchedule.done')}
        onPress={() => props.navigation.navigate('Main')}
      />
    </ScreenContainer>
  );
};

export default SherableSchedule;
