import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {colors, icons} from '../../../../constants';
import {translate} from '../../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../../components/DefaultButton/DefaultButton';
import LanguageItem from '../../Language/components/LanguageItem/LanguageItem';
import OnboardingProcessItem from './OnboardingProcessItem/OnboardingProcessItem';
import {ONBOARDING_SLUGS} from '../../../../constants/data';

const iamgeSizeheight = Dimensions.get('window').width - 40;

const ONBOARDING_PROCESS_ITEMS = [
  {
    number: 1,
    title: 'Choose your services',
    buttonTitle: 'Start',
    slug: ONBOARDING_SLUGS.SPECIALIST_SETUP_SERVICE,
  },
  {
    number: 2,
    title: 'Set Your Schedule',
    buttonTitle: 'Continue',
    slug: ONBOARDING_SLUGS.SPECIALIST_SETUP_SCHEDULE,
  },
  {
    number: 3,
    title: 'Create Payout Account',
    buttonTitle: 'Continue',
    slug: ONBOARDING_SLUGS.SPECIALIST_SETUP_STRIPE,
  },
  {
    number: 4,
    title: 'Complete Verification',
    buttonTitle: 'Continue',
    slug: ONBOARDING_SLUGS.SPECIALIST_BACKGROUND_CHECK,
  },
  {
    number: 5,
    title: 'Showcase Your Business',
    buttonTitle: 'Finish',
    slug: ONBOARDING_SLUGS.SPECIALIST_SHARE_SCHEDULE,
  },
];

export const OnboardingProcess = props => {
  const [isActiveItemIds, setIsActiveItemIds] = useState([1, 2, 3]);

  const isStepCompleted = slug => {
    return !props.specialistNotifications.some(n => n.slug === slug);
  };

  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate(
          'settingsNavigation.verificationScreens.onboardingProcess',
        )}
      />
      <Text style={styles.welcomeText}>{`${translate(
        'settingsNavigation.verificationScreens.welcome',
      )} ${props.user.user.firstName}!`}</Text>
      <Text style={styles.title}>
        {translate('settingsNavigation.verificationScreens.earnMore')}
      </Text>
      <FlatList
        contentContainerStyle={{alignItems: 'center', width: '100%'}}
        data={ONBOARDING_PROCESS_ITEMS}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        renderItem={({item, index}) => (
          <OnboardingProcessItem
            isFinished={isStepCompleted(item.slug)}
            {...item}
          />
        )}
        keyExtractor={item => item.title}
      />
    </ScreenContainer>
  );
};

export default OnboardingProcess;
