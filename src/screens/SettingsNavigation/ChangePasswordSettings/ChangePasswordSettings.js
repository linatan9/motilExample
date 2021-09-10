import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions, FlatList, Image,
} from 'react-native';
import {colors, icons} from "../../../constants";
import {translate} from '../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import { EMAIL_REG_EXP, REQUIRED_TEXT } from '../../../constants/data';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const iamgeSizeheight = Dimensions.get('window').width - 40;

const initValidState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const initValue = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export  const ChangePasswordSettings = (props) => {
  const [validationState, setValidationState] = useState(initValidState);
  const [passwordData, setPasswordData] = useState(initValue);
  console.log(validationState, 'validationState')
  const validate = () => {
    let isAllFieldsValid = true;
    const copyValidState = {...validationState};
    Object.keys(initValidState).map(key => {
      if (!passwordData[key]) {
        copyValidState[key] = translate('settingsNavigation.editPersonalInfo.fieldIsRequired');
        isAllFieldsValid = false;
      }
    });
    setValidationState(copyValidState);
    return isAllFieldsValid;
  };

  const onChangeData = (field, value) => {
    if(validationState[field]) {
      setValidationState({...validationState, ...{[field]: ''}});
    }
    setPasswordData({...passwordData, ...{[field]: value}});
  };

  const onSave = () => {
    if(validate()) {
      props.changePassword(passwordData).then(res => {
        console.log(res, 'RESSSS')
        props.navigation.navigate('SuccessfullChange', {isFromSettings: true});
      }).catch(err => {
        console.log(err, 'ERROR!!!!!')
        if (err?.data?.errors?.length) {
          const copyValidStat = {...validationState};
          err?.data?.errors.map(er => {
            if (er?.property?.length === 1 ) {
              let key = er.property[0];
              if(key) {
                copyValidStat[key] = er.message;
              }
            } else if (er?.property?.length > 1) {
              er?.property.forEach(prKey => {
                copyValidStat[prKey] = er.message
              })
            }
          });
          setValidationState(copyValidStat);
        }
      });
    }
  };

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}
    >
      <ScreenContainer>
        <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('changePassword')}/>
        <View style={{flex: 1}}>
          <DefaultInput
            secureTextEntry
            value={passwordData.oldPassword}
            placeholder={translate('settingsNavigation.changePasswordSettings.currentPassword')}
            invalidText={validationState.oldPassword}
            onChangeText={(t) => onChangeData('oldPassword', t)}
          />
          <DefaultInput
            secureTextEntry
            value={passwordData.newPassword}
            placeholder={translate('settingsNavigation.changePasswordSettings.newPassword')}
            invalidText={validationState.newPassword}
            onChangeText={(t) => onChangeData('newPassword', t)}
          />
          <DefaultInput
            secureTextEntry
            value={passwordData.confirmPassword}
            placeholder={translate('settingsNavigation.changePasswordSettings.repeatNewPassword')}
            invalidText={validationState.confirmPassword}
            onChangeText={(t) => onChangeData('confirmPassword', t)}
          />
        </View>
        <DefaultButton
          title={translate('save')}
          onPress={onSave}
          containerStyle={{marginTop: 10}}
        />
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default ChangePasswordSettings;
