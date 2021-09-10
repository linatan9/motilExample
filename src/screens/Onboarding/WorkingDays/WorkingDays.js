import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions, FlatList,
} from 'react-native';
import {colors, icons} from "../../../constants";
import Carousel from 'react-native-snap-carousel';
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import WorkingDayItem from './components/WorkingDayItem/WorkingDayItem';
import SettingItem from '../../SettingsNavigation/Settings/components/SettingItem/SettingItem';
import moment from 'moment';
import { workingHoursToIntervals } from '../../../constants/helpers';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const WorkingDays = (props) => {
  const [isDaysOffChanged, setIsDaysOffChanged] = useState(false);
  const isFromSummaryPage = props?.route?.params?.isFromSummaryPage;

  const onEdit = (intervals, dayOfWeek) => {
    props.navigation.navigate('WorkingHours', {intervals, dayOfWeek})
  };

  const onChangeDayOff = (dayOfWeek) => {
    const copyDaysOfWeek = [...props.daysOfWeek];
    copyDaysOfWeek.map(dow => {
        console.log(dow, dayOfWeek)
      if (dow.day === dayOfWeek.day) {
        dow.dayOff = !dow.dayOff;
      }
      return dow
    });
    props.onChangeDayOff(copyDaysOfWeek);
    setIsDaysOffChanged(true);
  };

  const onSave = () => {
    if (isDaysOffChanged) {
      const daysOff = [];
      props.daysOfWeek.forEach(dow => {
        daysOff.push({
          day: dow.day,
          isDayOff: !!dow.dayOff,
        });
      });
      console.log(daysOff, 'daysOff');
      const data = {
        days: daysOff
      };
      props.saveDaysOff(data).then(res => {
        props.navigation.navigate(isFromSummaryPage ? 'ScheduleSummary' : 'RestDays');
      }).catch(e => console.log(e));
    } else {
      props.navigation.navigate(isFromSummaryPage ? 'ScheduleSummary' : 'RestDays');
    }
  };

  return (
      <ScreenContainer>
        <MainHeader isNoBackArrow={isFromSummaryPage} onLeftIconClick={props.navigation.goBack} title={translate('onboarding.workingDays.setWorkingDays')}/>
        <FlatList
          style={{width: '100%', paddingBottom: 20}}
          data={props.daysOfWeek}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <WorkingDayItem onChangeDayOff={onChangeDayOff} onEdit={onEdit} index={index} key={index} dayOfWeek={item}/>
          )}
          keyExtractor={(item) => item.title}
        />
        <DefaultButton
          onPress={onSave}
          title={translate('save')}
          containerStyle={{marginTop: 10}}
        />
      </ScreenContainer>
  );
};

export default WorkingDays;
