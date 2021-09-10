/* eslint-disable no-undef */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {colors, icons} from '../../../constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {SocialButton} from '../../../components/SocialButton/SocialButton';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {
  ACCOUNT_SOCIAL_TYPES,
  EMAIL_REG_EXP,
  PHONE_REG_EXP,
} from '../../../constants/data';
import messaging from '@react-native-firebase/messaging';
import {translate} from '../../../i18n';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const initialValidationState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const iniSignupValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  role: 'SPECIALIST',
};

export const SignUp = props => {
  const [signUpValues, setSignUpValues] = useState(iniSignupValue);
  const [validationState, setValidationState] = useState(
    initialValidationState,
  );

  const onSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const checkLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then(result => {
          if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
            return result;
          } else {
            return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
              newResult => {
                return newResult;
              },
            );
          }
        })
        .catch(error => {
          console.log(error, ' ERORO ACCESS LOCARTION IOS');
          return error;
        });
    } else {
      return check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
            return result;
          } else {
            return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
              newResult => {
                return newResult;
              },
            );
          }
        })
        .catch(error => {
          console.log(error, ' ERORO ACCESS LOCARTION IOS');
          return error;
        });
    }
  };

  const getOneTimeLocation = async () => {
    const permissions = await checkLocationPermission();
    return new Promise((resolve, reject) => {
      if (permissions === RESULTS.GRANTED || permissions === RESULTS.LIMITED) {
        console.log(permissions, 'permissions');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          position => {
            //getting the Longitude from the location json
            const currentLongitude = JSON.stringify(position.coords.longitude);

            //getting the Latitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);

            //Setting Longitude state
            let coordinate = {
              lng: currentLongitude,
              lat: currentLatitude,
            };
            console.log('lng:', coordinate);
            resolve(coordinate);
          },
          error => {
            console.log('coordinatesError', error.message);
            resolve(undefined);
          },
          {timeout: 5000, maximumAge: 1000, enableHighAccuracy: false},
        );
      }
    });
  };

  const onSignUp = async () => {
    if (validate()) {
      let coordinates = await getOneTimeLocation();
      const fcmToken = await messaging().getToken();
      props
        .signUp({
          ...signUpValues,
          ...{
            device: {token: fcmToken, type: 'specialist-device'},
            ...{coordinates},
          },
        })
        .then(async res => {
          console.log(res, 'RESPONES SIG');
          try {
            await props.getSpecialistServices();
            await props.getNotifications();
            await props.getSchedule();
          } catch (e) {
            console.log(e, 'ERORORORORORO');
          }
          props.navigation.navigate('OnboardingNavigation');
        })
        .catch(err => {
          console.log(err, 'ERROR');
          if (err?.data?.errors?.length) {
            const copyValidStat = {...validationState};
            err?.data?.errors.map(er => {
              const key = er.property[0];
              if (key) {
                copyValidStat[key] = er.message;
              }
            });
            setValidationState(copyValidStat);
          }
        });
    }
  };

  const onGoogleButtonPress = async () => {
    let coordinates = await getOneTimeLocation();
    GoogleSignin.signIn()
      .then(res => {
        if (res.idToken) {
          const userData = {
            firstName: res.user.givenName,
            lastName: res.user.familyName,
            email: res.user.email,
            uid: res.user.id,
            coordinates: coordinates,
          };
          props.navigation.navigate('SignUpExternal', {
            userData: userData,
            accountType: ACCOUNT_SOCIAL_TYPES.GOOGLE,
          });
        }
        console.log(res, 'RES GOOGLE');
      })
      .catch(e => console.log(e.message, 'ERROR GOOGLE'));
  };

  const onFacebookButtonPress = () => {
    if (AccessToken.getCurrentAccessToken() != null) {
      LoginManager.logOut();
    }
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getFBUserInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const getFBUserInfoFromToken = async token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, email, first_name, last_name',
      },
    };
    let coordinates = await getOneTimeLocation();
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, resultFB) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          if (!resultFB.email) {
            Alert.alert(
              'No email acquired',
              'Sorry, please add email to your Facebook profile. Email is mandatory for login on Motil',
            );
          } else {
            const userData = {
              firstName: resultFB.first_name,
              lastName: resultFB.last_name,
              email: resultFB.email,
              uid: resultFB.id,
              coordinates: coordinates,
            };
            props.navigation.navigate('SignUpExternal', {
              userData: userData,
              accountType: ACCOUNT_SOCIAL_TYPES.FACEBOOK,
            });
          }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onAppleButtonPress = async () => {
    // performs logn request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    console.log(credentialState, 'credentialState', appleAuthRequestResponse);
    let coordinates = await getOneTimeLocation();
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const userData = {
        firstName: appleAuthRequestResponse.fullName.givenName,
        lastName: appleAuthRequestResponse.fullName.familyName,
        email: appleAuthRequestResponse.email,
        uid: appleAuthRequestResponse.user,
        coordinates: coordinates,
      };
      props.navigation.navigate('SignUpExternal', {
        userData: userData,
        accountType: ACCOUNT_SOCIAL_TYPES.APPLE,
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
        copyValidState[key] = translate(
          'settingsNavigation.editPersonalInfo.fieldIsRequired',
        );
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
      contentContainerStyle={styles.containerKeyboard}>
      <ScreenContainer verticalCenter>
        <Text style={styles.loginText}>{translate('auth.signUpText')}</Text>
        <View style={styles.signUpRow}>
          <Text style={styles.newText}>
            {translate('auth.signUp.alreadyAMember')}
          </Text>
          <TouchableOpacity onPress={onSignIn}>
            <Text style={styles.signUpText}>
              {translate('auth.signIn.logIn')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.nameRor}>
          <View style={styles.nameRorItem}>
            <DefaultInput
              onChangeText={t => onChange('firstName', t)}
              placeholder={translate('auth.signUp.firstName')}
              label={translate('auth.signUp.firstName')}
              value={signUpValues.firstName}
              invalidText={validationState.firstName}
            />
          </View>
          <View style={styles.nameRorItem}>
            <DefaultInput
              onChangeText={t => onChange('lastName', t)}
              placeholder={translate('auth.signUp.lastName')}
              label={translate('auth.signUp.lastName')}
              value={signUpValues.lastName}
              invalidText={validationState.lastName}
            />
          </View>
        </View>
        <DefaultInput
          onChangeText={t => onChange('email', t)}
          placeholder={translate('email')}
          label={translate('email')}
          value={signUpValues.email}
          invalidText={validationState.email}
        />
        <DefaultInput
          onChangeText={t => onChange('phone', t)}
          placeholder={translate('phone')}
          label={translate('phone')}
          value={signUpValues.phone}
          invalidText={validationState.phone}
        />
        <DefaultInput
          onChangeText={t => onChange('password', t)}
          placeholder={translate('password')}
          label={translate('password')}
          secureTextEntry
          value={signUpValues.password}
          invalidText={validationState.password}
        />
        <DefaultInput
          secureTextEntry
          onChangeText={t => onChange('confirmPassword', t)}
          placeholder={translate('auth.confirmPassword')}
          label={translate('auth.confirmPassword')}
          value={signUpValues.confirmPassword}
          invalidText={validationState.confirmPassword}
        />
        <DefaultButton onPress={onSignUp} isTopMargin title={'Sign Up'} />
        <View style={styles.socilLogintitleContainer}>
          <Text style={styles.socialLoginTitle}>
            {translate('auth.signIn.orLoginWith')}{' '}
          </Text>
        </View>
        <View style={styles.socialRow}>
          <SocialButton
            onPress={onFacebookButtonPress}
            title={translate('facebook')}
            icon={<icons.FacebookIcon />}
          />
          <SocialButton
            onPress={onAppleButtonPress}
            isTopMargin
            title={translate('auth.apple')}
            icon={<icons.AppleIcon />}
          />
          <SocialButton
            onPress={onGoogleButtonPress}
            isTopMargin
            title={translate('auth.google')}
            icon={<icons.GoogleIcon />}
          />
        </View>
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default SignUp;
