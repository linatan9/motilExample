import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import moment from 'moment';

const EditButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.editContainer}>
      <Text style={styles.editText}>{translate('edit')}</Text>
    </TouchableOpacity>
  );
};

export const NewTaskSummary = props => {
  const [customerData, setCustomerData] = useState(
    props?.route?.params?.customerData,
  );
  const [cards, setCards] = useState([]);
  const pickedCustomer = props?.route?.params?.pickedCustomer;
  const [activeCustomer, setActiveCustomer] = useState(null);
  const durationInHours = customerData.duration / 60;
  const selectedService = props.services.find(
    s => s.id === customerData.serviceId,
  );
  const formattedAddress = pickedCustomer?.customerProfile?.address[0]
    ? `${pickedCustomer?.customerProfile?.address[0].apartment} ${pickedCustomer?.customerProfile?.address[0].street}, ${pickedCustomer?.customerProfile?.address[0].city}, ${pickedCustomer?.customerProfile?.address[0].region}`
    : '';
  const isRightPromocode = false;

  useEffect(() => {
    const id = pickedCustomer ? pickedCustomer : null;
    if (id) {
      props
        .getCustomerCards(id)
        .then(res => {
          setCards(res);
          console.log(res, 'CARDFS+=====', 'ku');
        })
        .catch(e => console.log(e));
    }
  }, [pickedCustomer, props]);

  useLayoutEffect(() => {
    props.getCustomers().then(res => {
      const customer = res.customers.find(c => c?.id === pickedCustomer);
      setActiveCustomer(customer);
    });
  }, [pickedCustomer, props]);

  const onSend = () => {
    const copyData = {...customerData};
    copyData.timeStart = moment(copyData.timeStart).valueOf();
    props
      .createNewTask(copyData)
      .then(res => {
        console.log(res, 'SUCC CRATE');
        props.navigation.navigate('CompleteBooking');
      })
      .catch(e => console.log(e));
  };

  return (
    <ScreenContainer>
      <MainHeader
        onLeftIconClick={props.navigation.goBack}
        title={translate('newTaskNavigation.newTaskSummary.reviewYourBooking')}
      />
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{width: '100%', flex: 1}}>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>
              {activeCustomer
                ? `${activeCustomer.firstName} ${activeCustomer.lastName}`
                : customerData.email}
            </Text>
            <EditButton
              onPress={() =>
                props.navigation.navigate('CreateBooking', {
                  isFromBookingSummary: true,
                  customerData: customerData,
                  pickedCustomer: pickedCustomer,
                })
              }
            />
          </View>
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>{selectedService.name}</Text>
            <EditButton
              onPress={() =>
                props.navigation.navigate('SelectCategories', {
                  isFromBookingSummary: true,
                  customerData: customerData,
                  pickedCustomer: pickedCustomer,
                })
              }
            />
          </View>
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.itemTitle}>
                {translate('newTaskNavigation.newTaskSummary.dateTime')}
              </Text>
              <Text style={styles.itemSubTitle}>
                {moment(customerData.timeStart, 'YYYY-MM-DD hh:mm a').format(
                  'MMMM DD, YYYY',
                )}
              </Text>
              <Text style={styles.itemSubTitle}>
                {moment(customerData.timeStart, 'YYYY-MM-DD hh:mm a').format(
                  'hh:mm a',
                )}{' '}
                -{' '}
                {moment(customerData.timeStart, 'YYYY-MM-DD hh:mm a')
                  .add(customerData.duration, 'minutes')
                  .format('hh:mm a')}
              </Text>
            </View>
            <EditButton
              onPress={() =>
                props.navigation.navigate('ChooseDateTime', {
                  isFromBookingSummary: true,
                  customerData: customerData,
                  pickedCustomer: pickedCustomer,
                })
              }
            />
          </View>
          <View style={styles.itemRow}>
            {pickedCustomer?.customerProfile?.address[0] && (
              <View>
                <Text style={styles.itemTitle}>
                  {translate('newTaskNavigation.newTaskSummary.serviceAddress')}
                </Text>
                <Text style={styles.itemSubTitle}>{formattedAddress}</Text>
              </View>
            )}
          </View>
        </View>
        {cards?.[0] && (
          <View style={styles.itemRow}>
            <View>
              <Text style={styles.itemTitle}>
                {translate('newTaskNavigation.newTaskSummary.paymentMethod')}
              </Text>
              <View style={styles.paymentSubRow}>
                {cards?.[0].card.brand === 'visa' ? (
                  <icons.Visa style={{marginRight: 10}} />
                ) : (
                  <icons.MasterCard style={{marginRight: 10}} />
                )}

                <Text style={styles.itemSubTitle}>{cards?.[0].card.last4}</Text>
                <Text style={[styles.itemSubTitle, {marginLeft: 10}]}>
                  {cards?.[0].card.exp_month}/{cards?.[0].card.exp_year}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.itemRow}>
          <View>
            <Text style={styles.itemTitle}>
              {translate('newTaskNavigation.newTaskSummary.estimate')}
            </Text>
            <Text style={styles.itemEstimateSubTitle}>
              {translate('newTaskNavigation.newTaskSummary.basedOn')}
            </Text>
          </View>
          {/*<Text style={[styles.price, {color: isRightPromocode ? colors.green : colors.red}]}>${durationInHours * selectedService.price}</Text>*/}
          <Text
            style={[
              styles.price,
              {color: isRightPromocode ? colors.green : colors.textWhite},
            ]}>
            ${durationInHours * selectedService.price}
          </Text>
        </View>
        {/*<View style={styles.itemRow}>*/}
        {/*<Text style={[styles.itemTitle, {marginTop: 10}]}>{translate('newTaskNavigation.newTaskSummary.promoCode')}</Text>*/}
        {/*<View style={{flex: 0.5, justifyContent: 'flex-start'}}>*/}
        {/*<DefaultInput*/}
        {/*renderErrorMessage={false}*/}
        {/*containerStyle={{marginTop: 0}}*/}
        {/*inputStyle={{fontWeight: 'bold', textAlign: 'right'}}*/}
        {/*placeholder={translate('newTaskNavigation.newTaskSummary.promoCode')}*/}
        {/*/>*/}
        {/*<Text style={[styles.promocodeStatusText, {color: isRightPromocode ? colors.textWhite : colors.red}]}>{translate('newTaskNavigation.newTaskSummary.accepted')}</Text>*/}
        {/*</View>*/}
        {/*</View>*/}
        <DefaultInput
          renderErrorMessage={false}
          placeholder={translate('newTaskNavigation.newTaskSummary.giveUs')}
        />
      </ScrollView>
      <DefaultButton
        title={translate('newTaskNavigation.newTaskSummary.sendToCustomer')}
        onPress={onSend}
        containerStyle={{marginTop: 20}}
      />
    </ScreenContainer>
  );
};

export default NewTaskSummary;
