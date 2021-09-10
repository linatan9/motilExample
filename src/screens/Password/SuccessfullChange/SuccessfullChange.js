import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, icons} from "../../../constants";
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { SocialButton } from '../../../components/SocialButton/SocialButton';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

export  const SuccessfullChange = (props) => {
  const isFromSettings = props?.route?.params?.isFromSettings;
  const onResetPassword = () => {
    props.navigation.navigate(isFromSettings ? 'Main' : 'SignIn');
  };
  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}
    >
      <ScreenContainer verticalCenter>
        <View style={styles.titleRow}>
          <Text style={styles.loginText}>{translate('passwordComponent.yourPassword')}</Text>
        </View>
        <DefaultButton
          isTopMargin
          title={translate('passwordComponent.ok')}
          onPress={onResetPassword}
        />
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default SuccessfullChange;
