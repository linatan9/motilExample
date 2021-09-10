import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity, Platform, BackHandler,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {colors, icons} from "../../../constants";
import Carousel from 'react-native-snap-carousel';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import SearchInput from '../../../components/SearchInput/SearchInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import {translate} from '../../../i18n';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import RNExitApp from "react-native-exit-app";

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const CreateBooking = (props) => {
  const [isFromBookingSummary, setIsFromBookingSummary] = useState(props?.route?.params?.isFromBookingSummary);
  const [customerData, setCustomerData] = useState(props?.route?.params?.customerData || {duration: 30});
  const [customers, setCustomers] = useState([]);
  const [pickedCustomer, setPickedCustomer] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const backAction = (e) => {
      console.log(e, 'EVENT')

      if (e?.data?.action?.type === 'POP') {
        if(Platform.OS === 'ios') {
          RNExitApp.exitApp();
        } else {
          BackHandler.exitApp();
        }
        e.preventDefault();
      }
    };
    const listern = props.navigation.addListener('beforeRemove', backAction);
    return () =>  listern("beforeRemove", backAction);
  }, []);
  useLayoutEffect(() => {
    props.getCustomers().then(res => {
      const labledCustomers = res.customers.map(c => {
        c.label = `${c.firstName} ${c.lastName}`;
        return c;
      } );
      setCustomers(labledCustomers);
    })
  }, []);


  useEffect(() => {
    if (props?.route?.params?.isCreateSuccess) {
      setCustomerData({duration: 30});
      setIsFromBookingSummary(false);
      setPickedCustomer(null);
    }
  }, [props?.route?.params?.isCreateSuccess]);

  useEffect(() => {
    if (props?.route?.params?.customerData) {
      setCustomerData(props?.route?.params?.customerData);
    }
  }, [props?.route?.params?.customerData]);

  const onChangeCustomerData = (key, value) => {
    console.log(key, value)
    const copyCustomerData = {...customerData};
    if (key === 'customerId') {
      setPickedCustomer(value);
      delete copyCustomerData.phone;
      delete copyCustomerData.email;
      setCustomerData({...copyCustomerData, ...{customerId: value}});
      return
    }
    delete copyCustomerData.customerId;
    setCustomerData({...copyCustomerData, ...{[key]: value}});
  };
  console.log(pickedCustomer)
  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}
    >
      <ScreenContainer>
        <MainHeader isNoBackArrow onLeftIconClick={props.navigation.goBack} title={translate('newTaskNavigation.createBooking.createBooking')}/>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 15}}>
          <DropDownPicker
            open={open}
            value={pickedCustomer}
            items={customers}
            setOpen={setOpen}
            setValue={setPickedCustomer}
            onChangeValue={v => onChangeCustomerData('customerId', v)}
            setItems={setCustomers}
            listItemContainerStyle={{
              zIndex: 100000
            }}
            schema={{
              label: 'label',
              value: 'id',
              lastName: 'lastName'
            }}
            style={{
              backgroundColor: colors.background,
              borderWidth: 0,
            }}
            textStyle={{
              color: colors.textWhite,
              fontSize: 15
            }}
            listItemLabelStyle={{
              color: colors.background
            }}
            zIndex={1000000}
          />
          {
            pickedCustomer && (
              <TouchableOpacity onPress={() => onChangeCustomerData('customerId', null)}>
                <icons.Close color={colors.textWhite} height={15} width={15}/>
              </TouchableOpacity>
            )
          }
        </View>
        <View style={[styles.pickerContainer, {borderBottomColor: customerData?.email || customerData?.phone ? colors.grayText : colors.textWhite}]}>
        </View>
        <View style={{zIndex: open ? -1 : 0}}>
          <View style={styles.addNewRow}>
            <Text style={styles.orText}>{translate('newTaskNavigation.createBooking.or')}</Text>
            <Text style={styles.addNewTest}>{translate('newTaskNavigation.createBooking.addNewCustomer')}:</Text>
          </View>
          <DefaultInput
            disabled={pickedCustomer}
            placeholder={translate('newTaskNavigation.createBooking.customersEmail')}
            label={translate('newTaskNavigation.createBooking.customersEmail')}
            onChangeText={(t) => onChangeCustomerData('email', t)}
          />
          <DefaultInput
            disabled={pickedCustomer}
            placeholder={translate('newTaskNavigation.createBooking.customersPhoneNumber')}
            label={translate('newTaskNavigation.createBooking.customersPhoneNumber')}
            onChangeText={(t) => onChangeCustomerData('phone', t)}
          />
        </View>
        <View style={{width: '100%', flex: 1, justifyContent: 'flex-end'}}>
          <DefaultButton
            disabled={!pickedCustomer && (!customerData.email && !customerData.phone)}
            title={translate('next')}
            onPress={() => props.navigation.navigate(isFromBookingSummary ? 'NewTaskSummary' : 'SelectCategories', {customerData: customerData, pickedCustomer: pickedCustomer})}
            containerStyle={{marginTop: 10}}
          />
        </View>
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default CreateBooking;
