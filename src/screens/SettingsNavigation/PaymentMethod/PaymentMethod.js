import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';

export const PaymentMethod = (props) => {
  return (
    <ScreenContainer>
      <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('paymentMethod.title')}/>
      <View style={styles.stripeContainer}>
        <View style={styles.stripe}>
          <Text style={styles.stripeText}>{translate('paymentMethod.stripe')}</Text>
        </View>
        <Text style={styles.status}>{translate('paymentMethod.active')}</Text>
      </View>
      <DefaultButton
        title={translate('paymentMethod.button')}
        onPress={console.log(1)}
        containerStyle={{marginTop: 16}}
      />
    </ScreenContainer>
  );
};
export default PaymentMethod;
