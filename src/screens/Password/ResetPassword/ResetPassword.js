import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {EMAIL_REG_EXP} from '../../../constants/data';

export const ResetPassword = props => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const onResetPassword = () => {
    const isValidEmail = EMAIL_REG_EXP.test(email);
    console.log(isValidEmail, 'isValidEmail');
    if (!isValidEmail) {
      setErrorEmail('Must be a valid email');
    } else {
      props
        .resetPasswordRequest(email)
        .then(res => {
          props.navigation.navigate('SignIn');
        })
        .catch(err => {
          if (err?.data?.errors?.length) {
            err?.data?.errors.map(er => {
              setErrorEmail(er.message);
            });
          }
        });
    }
  };

  const onChangeEmail = newEmail => {
    if (errorEmail) {
      setErrorEmail('');
    }
    setEmail(newEmail);
  };

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}>
      <ScreenContainer verticalCenter>
        <Text style={styles.loginText}>
          {translate('passwordComponent.resetPassword')}
        </Text>
        <View style={styles.signUpRow}>
          <Text style={styles.newText}>
            {translate('passwordComponent.pleaseEnterEmail')}
          </Text>
        </View>
        <DefaultInput
          value={email}
          onChangeText={onChangeEmail}
          placeholder={translate('email')}
          label={'Email'}
          invalidText={errorEmail}
        />
        <DefaultButton
          isTopMargin
          title={translate('passwordComponent.resetPassword')}
          onPress={onResetPassword}
        />
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default ResetPassword;
