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
import ServiceItem from './components/ServiceItem/ServiceItem';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const SelectCategories = (props) => {
  const [customerData, setCustomerData] = useState(props?.route?.params?.customerData);
  const pickedCustomer = props?.route?.params?.pickedCustomer;
  const isFromBookingSummary = props?.route?.params?.isFromBookingSummary;
  const onPressService = (id) => {
    const newData = {...customerData, ...{serviceId: id}};
    setCustomerData(newData);
    props.navigation.navigate(isFromBookingSummary ? 'NewTaskSummary' : 'ServiceDuration', {customerData: newData, pickedCustomer: pickedCustomer});
  };

  return (
      <ScreenContainer>
        <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('newTaskNavigation.selectCategories.service')}/>
        <SearchInput placeholder={translate('newTaskNavigation.selectCategories.searchService')}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{translate('newTaskNavigation.selectCategories.allServices')}</Text>
        </View>
        <ScrollView>
          <View style={styles.subCategoriesWrapper}>
            {
              props.services.map(s => <ServiceItem backgroundColor={s.background} id={s.id} onPress={onPressService} title={s.name} price={s.price}/>)
            }
          </View>
        </ScrollView>
      </ScreenContainer>
  );
};

export default SelectCategories;
