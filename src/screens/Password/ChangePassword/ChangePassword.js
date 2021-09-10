import React from 'react';
import {View, Text} from 'react-native';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

export const ChangePassword = props => {
  const onReset = () => {
    props.navigation.navigate('SuccessfullChange');
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
            {translate('passwordComponent.pleaseEnterEmaild')}
          </Text>
        </View>
        <DefaultInput
          placeholder={translate('password')}
          label={translate('password')}
        />
        <DefaultInput
          placeholder={translate(
            'passwordComponent.changePassword.confirmPassword',
          )}
          label={translate('passwordComponent.changePassword.confirmPassword')}
        />
        <DefaultButton
          isTopMargin
          title={translate('changePassword')}
          onPress={onReset}
        />
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default ChangePassword;
