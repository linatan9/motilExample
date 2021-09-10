/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {icons} from '../../../constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import {SocialButton} from '../../../components/SocialButton/SocialButton';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {
  ACCOUNT_SOCIAL_TYPES,
  EMAIL_REG_EXP,
  MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY,
} from '../../../constants/data';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import {translate} from '../../../i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {checkOnboardingComplete} from '../../../constants/helpers';
import {setToken} from '../../../api';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Geolocation from '@react-native-community/geolocation';

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const initialValidationState = {
  email: '',
  password: '',
};

export const SignIn = props => {
  const [validationState, setValidationState] = useState(
    initialValidationState,
  );
  const [signInValues, setSignInValues] = useState({
    email: '',
    password: '',
  });

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
          return error;
        });
    }
  };

  const getPermission = () => {
    messaging()
      .requestPermission()
      .catch(error => {
        getPermission();
      });
  };

  useLayoutEffect(() => {
    SplashScreen.hide();
    messaging().registerDeviceForRemoteMessages();
    requestUserPermission();
    createNotificationListeners();
    messaging()
      .hasPermission()
      .then(enabled => {
        console.log(enabled, 'enabled');
        if (!enabled) {
          getPermission();
        }
      });
  }, []);

  useEffect(() => {
    autoLogin();
  }, []);

  const onGoogleButtonPress = async () => {
    let coordinates = await getOneTimeLocation();
    GoogleSignin.signIn()
      .then(async resGoogle => {
        console.log(resGoogle, 'RES GOOGLE');
        const fcmToken = await messaging().getToken();
        const data = {
          email: resGoogle.user.email,
          uid: resGoogle.user.id,
          accountType: ACCOUNT_SOCIAL_TYPES.GOOGLE,
          device: {
            type: 'specialist-device',
            token: fcmToken,
          },
          coordinates: coordinates,
        };

        props
          .signInExternal(data)
          .then(async res => {
            try {
              await props.getSpecialistServices();
              await props.getNotifications();
              await props.getSchedule();
            } catch (e) {
              return e;
            }
            const isCompleteOnboarding = checkOnboardingComplete(
              props.specialistNotifications,
            );
            if (res.user?.specialistProfile?.introCompleted) {
              if (isCompleteOnboarding) {
                props.navigation.navigate('Main');
              } else {
                props.navigation.navigate('OnboardingNavigation');
              }
            } else {
              props.navigation.navigate('Intro');
            }
          })
          .catch(e => {
            if (e.status === 404) {
              const userData = {
                firstName: resGoogle.user.givenName,
                lastName: resGoogle.user.familyName,
                email: resGoogle.user.email,
                uid: resGoogle.user.id,
                coordinates: coordinates,
              };
              props.navigation.navigate('SignUpExternal', {
                userData: userData,
                accountType: ACCOUNT_SOCIAL_TYPES.GOOGLE,
              });
            }
            console.log(e, 'ERORORORORORO');
          });
      })
      .catch(e => console.log(e.message, 'ERROR GOOGLE'));
  };

  const autoLogin = async () => {
    if (props.token) {
      setToken(props.token);
      props
        .refreshToken({token: props.token})
        .then(async res => {
          if (res) {
            await props.getSpecialistServices();
            await props.getNotifications();
            await props.getSchedule();
            const isCompleteOnboarding = checkOnboardingComplete(
              props.specialistNotifications,
            );
            console.log(
              props.user?.specialistProfile,
              'props.user?.specialistProfileprops.user?.specialistProfileprops.user?.specialistProfileprops.user?.specialistProfile',
            );
            if (props.user?.specialistProfile?.introCompleted) {
              if (isCompleteOnboarding) {
                props.navigation.navigate('Main');
              } else {
                props.navigation.navigate('OnboardingNavigation');
              }
            } else {
              props.navigation.navigate('Intro');
            }
          }
        })
        .catch(e => console.log(e));
    }
  };

  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    let coordinates = await getOneTimeLocation();
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const fcmToken = await messaging().getToken();
      const data = {
        email: appleAuthRequestResponse.email || undefined,
        uid: appleAuthRequestResponse.user,
        accountType: ACCOUNT_SOCIAL_TYPES.APPLE,
        device: {
          type: 'specialist-device',
          token: fcmToken,
        },
        coordinates: coordinates,
      };
      props
        .signInExternal(data)
        .then(async res => {
          try {
            await props.getSpecialistServices();
            await props.getNotifications();
            await props.getSchedule();
          } catch (e) {
            console.log(e);
          }
          const isCompleteOnboarding = checkOnboardingComplete(
            props.specialistNotifications,
          );
          if (res.user?.specialistProfile?.introCompleted) {
            if (isCompleteOnboarding) {
              props.navigation.navigate('Main');
            } else {
              props.navigation.navigate('OnboardingNavigation');
            }
          } else {
            props.navigation.navigate('Intro');
          }
        })
        .catch(e => {
          if (e.status === 404) {
            const userData = {
              firstName: appleAuthRequestResponse.fullName.givenName,
              lastName: appleAuthRequestResponse.fullName.familyName,
              email: appleAuthRequestResponse.email,
              uid: appleAuthRequestResponse.user,
            };
            props.navigation.navigate('SignUpExternal', {
              userData: userData,
              accountType: ACCOUNT_SOCIAL_TYPES.APPLE,
            });
          }
          console.log(e);
        });
    }
  };

  const savePushToStoraage = async data => {
    const currentMessages =
      (await AsyncStorage.getItem(MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY)) || [];
    const isMessages = await AsyncStorage.getItem(
      MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY,
    );
    const messageArray = isMessages ? JSON.parse(currentMessages) : [];
    messageArray.push(data);
    await AsyncStorage.setItem(
      MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY,
      JSON.stringify(messageArray),
    );
  };

  const createNotificationListeners = async () => {
    await messaging().onNotificationOpenedApp(msg => {
      console.log(msg, 'onNotificationOpenedApp!!!');
    });
    messaging()
      .getInitialNotification()
      .then(async message => {
        const currentMessages = await AsyncStorage.getItem(
          MOTIL_PUSH_NOTIFICATIONS_STORAGE_KEY,
        );
        console.log(message, 'MESSAGE!!!', currentMessages);
      });
    messaging().onMessage(async message => {
      await savePushToStoraage(message.data);
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      await savePushToStoraage(remoteMessage.data);
    });
  };

  const validate = () => {
    let isAllFieldsValid = true;
    const copyValidState = {...validationState};
    Object.keys(initialValidationState).map(key => {
      if (!signInValues[key]) {
        copyValidState[key] = translate(
          'settingsNavigation.editPersonalInfo.fieldIsRequired',
        );
        isAllFieldsValid = false;
      } else if (key === 'email') {
        const isValidEmail = EMAIL_REG_EXP.test(signInValues.email);
        if (!isValidEmail) {
          copyValidState[key] = 'Must be a valid email';
          isAllFieldsValid = false;
        }
      }
    });
    setValidationState(copyValidState);
    return isAllFieldsValid;
  };

  const onSignUp = () => {
    props.navigation.navigate('SignUp');
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
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

  const onSignIn = async () => {
    if (validate()) {
      let coordinates = await getOneTimeLocation();
      const fcmToken = await messaging().getToken();
      console.log(fcmToken, coordinates);
      props
        .signIn(
          signInValues.email,
          signInValues.password,
          coordinates,
          fcmToken,
        )
        .then(async res => {
          await props.getSpecialistServices();
          await props.getNotifications();
          try {
            await props.getSchedule();
          } catch (e) {
            return e;
          }
          const isCompleteOnboarding = checkOnboardingComplete(
            props.specialistNotifications,
          );
          if (res.user?.specialistProfile?.introCompleted) {
            if (isCompleteOnboarding) {
              props.navigation.navigate('Main');
            } else {
              props.navigation.navigate('OnboardingNavigation');
            }
          } else {
            props.navigation.navigate('Intro');
          }
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
    const fcmToken = await messaging().getToken();
    let coordinates = await getOneTimeLocation();
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, resultFB) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('resultFB', resultFB);
          if (!resultFB.email) {
            Alert.alert(
              'No email acquired',
              'Sorry, please add email to your Facebook profile. Email is mandatory for login on Motil',
            );
          } else {
            const data = {
              email: resultFB.email,
              uid: resultFB.id,
              accountType: ACCOUNT_SOCIAL_TYPES.FACEBOOK,
              device: {
                type: 'specialist-device',
                token: fcmToken,
              },
              coordinates: coordinates,
            };
            console.log('signInExternalData', data);
            props
              .signInExternal(data)
              .then(async res => {
                try {
                  await props.getSpecialistServices();
                  await props.getNotifications();
                  await props.getSchedule();
                } catch (e) {
                  console.log(e, 'ERORORORORORO');
                }
                const isCompleteOnboarding = checkOnboardingComplete(
                  props.specialistNotifications,
                );
                console.log(res, 'RES==============');
                if (res.user?.specialistProfile?.introCompleted) {
                  if (isCompleteOnboarding) {
                    props.navigation.navigate('Main');
                  } else {
                    props.navigation.navigate('OnboardingNavigation');
                  }
                } else {
                  props.navigation.navigate('Intro');
                }
              })
              .catch(e => {
                if (e.status === 404 || e.status === 400) {
                  const userData = {
                    firstName: resultFB.first_name,
                    lastName: resultFB.last_name,
                    email: resultFB.email ? resultFB.email : '',
                    uid: resultFB.id,
                  };
                  props.navigation.navigate('SignUpExternal', {
                    userData: userData,
                    accountType: ACCOUNT_SOCIAL_TYPES.FACEBOOK,
                  });
                }
                console.log(e, 'ERORORORORORO');
              });
          }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onForgotPassword = () => {
    props.navigation.navigate('Password');
  };

  const onChange = (field, value) => {
    if (validationState[field]) {
      setValidationState({...validationState, ...{[field]: ''}});
    }
    setSignInValues({...signInValues, [field]: value});
  };

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}>
      <ScreenContainer verticalCenter>
        <Text style={styles.loginText}>{translate('auth.signIn.logIn')}</Text>
        <View style={styles.signUpRow}>
          <Text style={styles.newText}>
            {translate('auth.signIn.newToThisApp')}
          </Text>
          <TouchableOpacity onPress={onSignUp}>
            <Text style={styles.signUpText}>
              {translate('auth.signUpText')}
            </Text>
          </TouchableOpacity>
        </View>
        <DefaultInput
          placeholder={translate('email')}
          label={translate('email')}
          value={signInValues.email}
          onChangeText={t => onChange('email', t)}
          invalidText={validationState.email}
        />
        <DefaultInput
          placeholder={translate('password')}
          label={translate('password')}
          secureTextEntry
          value={signInValues.password}
          onChangeText={t => onChange('password', t)}
          invalidText={validationState.password}
        />
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={onForgotPassword}>
          <Text style={styles.forgotPasswordText}>
            {translate('auth.forgotPassword')}
          </Text>
        </TouchableOpacity>
        <DefaultButton
          isTopMargin
          title={translate('auth.signIn.logIn')}
          onPress={onSignIn}
        />
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

export default SignIn;
