import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions
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
import DurationTime from './components/DurationTime/DurationTime';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const ServiceDuration = (props) => {
  const [customerData, setCustomerData] = useState(props?.route?.params?.customerData);
  const pickedCustomer = props?.route?.params?.pickedCustomer;

  const onChange = (value) => {
    const duration = value.hours * 60 + value.minutes;
    setCustomerData({...customerData, ...{duration: duration}});
  };

  const onPickTime = () => {
    props.navigation.navigate('ChooseDateTime', {customerData : customerData, pickedCustomer: pickedCustomer});
  };

  return (
      <ScreenContainer>
        <MainHeader onLeftIconClick={props.navigation.goBack} title={'Chose service duration'}/>
        <Text style={styles.titleText}>
          {translate('newTaskNavigation.serviceDuration.estimateHowMuchTime')}
        </Text>
        <View style={{width: '100%', flex: 1, justifyContent: 'center'}}>
          <DurationTime onChange={onChange}/>
          <Text style={styles.minimumText}>{translate('newTaskNavigation.serviceDuration.minimumBooking')}</Text>
          <DefaultButton
            title={translate('newTaskNavigation.serviceDuration.pickTime')}
            onPress={onPickTime}
            containerStyle={{marginTop: 10}}
          />
        </View>
      </ScreenContainer>
  );
};

export default ServiceDuration;
