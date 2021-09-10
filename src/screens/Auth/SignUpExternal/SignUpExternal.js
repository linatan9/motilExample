import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors, icons} from "../../../constants";

import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import { SocialButton } from '../../../components/SocialButton/SocialButton';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { EMAIL_REG_EXP, PHONE_REG_EXP, REQUIRED_TEXT } from '../../../constants/data';
import messaging from '@react-native-firebase/messaging';
import {translate} from '../../../i18n';

const initialValidationState = {
  phone: '',
};

const iniSignupValue = {
  phone: "",
};

export  const SignUpExternal = (props) => {
  const userData = props?.route?.params?.userData;
  const accountType = props?.route?.params?.accountType;
  console.log(userData, 'userDatauserDatauserData')


  const [signUpValues, setSignUpValues] = useState(iniSignupValue);
  const [validationState, setValidationState] = useState(initialValidationState);

  useEffect(() => {
    let validation = validationState;
    if (!userData.email) {
      validation.email = ''
    }
    console.log(validation, 'validation')
    setValidationState(validation)
  }, []);

  const onSignIn = () => {
    props.navigation.navigate('SignIn');
  };
  const onSignUp = async () => {
    if(validate()) {
      const email = userData.email ? userData.email : signUpValues.email;
      const fcmToken = await messaging().getToken();
      const data = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: email,
        phone: signUpValues.phone,
        role: "SPECIALIST",
        accountType: accountType,
        uid: userData.uid,
        device: {
          type: "specialist-device",
          token: fcmToken
        },
        coordinates: userData.coordinates
      };
      console.log('SignUpExternalData',data);
      props.signUpExternal(data).then(async res => {
        console.log(res, 'RESPONES SIG');
        try {
          await props.getSpecialistServices();
          await props.getNotifications();
          await props.getSchedule();
        } catch (e) {
          console.log(e, 'ERORORORORORO');
        }
        props.navigation.navigate('OnboardingNavigation');
      }).catch(err => {
        console.log(err, 'ERROR')
        if (err?.data?.errors?.length) {
          const copyValidStat = {...validationState};
          const email = userData.email ? userData.email : signUpValues.email;
          err?.data?.errors.map(er => {
            const key = er.property[0];
            if(key) {
              copyValidStat[key] = er.message;
            }
            console.log(validationState, 'validationStatevalidationStatevalidationState')
            if(email && key === 'email') {
              Alert.alert(key.toUpperCase(), er.message);
            }
          });
          setValidationState(copyValidStat);
        }
      });
    }
  };

  const onChange = (field, value) => {
    if (validationState[field]) {
      setValidationState({...validationState, ...{[field]: ''}});
    }
    setSignUpValues({...signUpValues, [field]: value});
  };

  const validate = () => {
    let isAllFieldsValid = true;
    const copyValidState = {...validationState};
    Object.keys(initialValidationState).map(key => {
      if (!signUpValues[key]) {
        copyValidState[key] = translate('settingsNavigation.editPersonalInfo.fieldIsRequired');
        isAllFieldsValid = false;
      } else if (key === 'email') {
        const isValidEmail = EMAIL_REG_EXP.test(signUpValues.email);
        if (!isValidEmail) {
          copyValidState[key] = 'Must be a valid email';
          isAllFieldsValid = false;
        }
      } else if (key === 'phone') {
        const isValidPhone = PHONE_REG_EXP.test(signUpValues.phone);
        if (!isValidPhone) {
          copyValidState[key] = 'Phone number should follow US format';
          isAllFieldsValid = false;
        }
      }
    });
    if (signUpValues.password !== signUpValues.confirmPassword) {
      copyValidState.password = 'Passwords mismatch';
      copyValidState.confirmPassword = 'Passwords mismatch';
      isAllFieldsValid = false;
    }
    setValidationState(copyValidState);
    return isAllFieldsValid;
  };

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}
    >
      <ScreenContainer verticalCenter>
        <Text style={styles.loginText}>{translate('auth.signUpText')}</Text>
        <View style={styles.signUpRow}>
          <Text style={styles.newText}>{translate('auth.signUp.alreadyAMember')}</Text>
          <TouchableOpacity onPress={onSignIn}>
            <Text style={styles.signUpText}>{translate('auth.signIn.logIn')}</Text>
          </TouchableOpacity>
        </View>
        <DefaultInput
          onChangeText={(t) => onChange('phone', t)}
          placeholder={translate('phone')}
          label={translate('phone')}
          value={signUpValues.phone}
          invalidText={validationState.phone}
        />
        {!userData.email &&
        <DefaultInput
          onChangeText={(t) => onChange('email', t)}
          placeholder={translate('email')}
          label={translate('email')}
          value={signUpValues.email}
          invalidText={validationState.email}
        />}
        <DefaultButton
          onPress={onSignUp}
          isTopMargin
          title={'Sign Up'}
        />
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default SignUpExternal;
