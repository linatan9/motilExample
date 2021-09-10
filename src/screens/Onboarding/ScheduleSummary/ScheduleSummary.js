/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, FlatList} from 'react-native';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import ScheduleSummaryItem from './components/ScheduleSummaryItem/ScheduleSummaryItem';
import {
  ONBOARDING_SLUGS,
  SCHEDULE_SUMMARY_ITEMS_NAMES,
} from '../../../constants/data';
import moment from 'moment';
import {
  capitalizeFirstLetter,
  getNotificationBySlug,
} from '../../../constants/helpers';

export const ScheduleSummary = props => {
  const isFromSettings = props?.route?.params?.isFromSettings;
  const [serviceOnboarding, setServiceOnboarding] = useState(
    getNotificationBySlug(
      props.specialistNotifications,
      ONBOARDING_SLUGS.SPECIALIST_SETUP_SCHEDULE,
    ),
  );

  const scheduleSummaryItemsData = [
    {
      title: `${translate('onboarding.scheduleSummaryItemsData.workingHours')}`,
      routeName: SCHEDULE_SUMMARY_ITEMS_NAMES.WORKING_HOURS,
    },
    {
      title: `${translate('onboarding.scheduleSummaryItemsData.workingDays')}`,
      routeName: SCHEDULE_SUMMARY_ITEMS_NAMES.WORKING_DAYS,
    },
    {
      title: `${translate('onboarding.scheduleSummaryItemsData.daysOff')}`,
      routeName: SCHEDULE_SUMMARY_ITEMS_NAMES.REST_DAYS,
    },
  ];

  const getSubTitleForRestDays = markedDates => {
    return markedDates
      .map(md => {
        return moment(md).format('d MMM').toString();
      })
      .join(', ');
  };

  const getWorkingDays = daysOfWeek => {
    return daysOfWeek
      .filter(wd => !wd.dayOff)
      .map(wd => capitalizeFirstLetter(wd.day.substring(0, 3)))
      .join(', ');
  };

  const getItemSubTitle = routeName => {
    switch (routeName) {
      case SCHEDULE_SUMMARY_ITEMS_NAMES.WORKING_HOURS:
        return `${props.workingDays.from} - ${props.workingDays.to}`;
      case SCHEDULE_SUMMARY_ITEMS_NAMES.REST_DAYS:
        if (props.markedDates.length !== 0) {
          return getSubTitleForRestDays(props.markedDates);
        }
        return translate('onboarding.scheduleSummary.selectDaysOff');
      case SCHEDULE_SUMMARY_ITEMS_NAMES.WORKING_DAYS:
        return getWorkingDays(props.daysOfWeek);
      default:
        return translate('onboarding.scheduleSummary.selectWorkingWeekDays');
    }
  };
  const onNextSave = async () => {
    if (serviceOnboarding) {
      await props.setOnboardingProgress(
        ONBOARDING_SLUGS.SPECIALIST_SETUP_SCHEDULE,
      );
    }
    props.navigation.navigate(
      isFromSettings ? 'SherableSchedule' : 'OnboardPaymentAccount',
    );
  };

  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={
          isFromSettings ? `${translate('schedule')}` : `${translate('step')} 3`
        }
      />
      {!isFromSettings ? (
        <Text style={styles.title}>
          {translate('onboarding.scheduleSummary.availability')}
        </Text>
      ) : null}
      <FlatList
        style={{width: '100%'}}
        data={scheduleSummaryItemsData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ScheduleSummaryItem
            key={index}
            {...item}
            subTitle={getItemSubTitle(item.routeName)}
          />
        )}
        keyExtractor={item => item.title}
      />
      {isFromSettings ? (
        <Text style={styles.bottomText}>
          {translate('onboarding.scheduleSummary.servicesOnline')}
        </Text>
      ) : null}
      <DefaultButton
        title={isFromSettings ? translate('shareSchedule') : translate('next')}
        onPress={onNextSave}
        containerStyle={{marginTop: 10}}
      />
    </ScreenContainer>
  );
};

export default ScheduleSummary;
