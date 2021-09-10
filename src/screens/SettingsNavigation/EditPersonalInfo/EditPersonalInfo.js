import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {colors, icons} from '../../../constants';
import {translate} from '../../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../../components/ScreenContainer/ScreenContainer';
import {MainHeader} from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import DefaultInput from '../../../components/DefaultInput/DefaultInput';
import {scaledHeight} from '../../../constants/globalStyles';
import {
  ACCOUNT_SOCIAL_TYPES,
  EMAIL_REG_EXP,
  PHONE_REG_EXP,
} from '../../../constants/data';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

const iamgeSizeheight = Dimensions.get('window').width - 40;

const initialValidationState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  photo: '',
};

export const EditPersonalInfo = props => {
  const [user, setUser] = useState({
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    email: props.user.email,
    phone: props.user.phone,
  });

  const [isFbConnected, setIsFbConnected] = useState(false);

  const [validationState, setValidationState] = useState(
    initialValidationState,
  );
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [changedFields, setChangedFields] = useState(false);

  const getUserStoragePermissions = async () => {
    await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
      .then(newResult => {
        console.log(newResult, 'RESULT');
      })
      .catch(err => console.log(err, '======'));
    await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
      .then(newResult => {
        console.log(newResult, 'RESULT');
      })
      .catch(err => console.log(err, '======'));
  };

  const checkDataChanges = () => {
    return Object.keys(user).some(key => {
      return user[key] !== props.user[key];
    });
  };

  const getChangedField = () => {
    return Object.keys(user).filter(key => {
      if (user[key] !== props.user[key]) {
        return key;
      }
    });
  };

  useEffect(() => {
    const isChanged = checkDataChanges();
    if (isChanged !== isDataChanged) {
      setIsDataChanged(true);
    }
    const fbAccount = props.user.accounts.find(
      account => account.type === ACCOUNT_SOCIAL_TYPES.FACEBOOK,
    );
    setIsFbConnected(!!fbAccount);
  }, [user]);

  const validate = () => {
    let isAllFieldsValid = true;
    const copyValidState = {...validationState};
    Object.keys(user).map(key => {
      if (!user[key]) {
        copyValidState[key] = translate(
          'settingsNavigation.editPersonalInfo.fieldIsRequired',
        );
        isAllFieldsValid = false;
      } else if (key === 'email') {
        const isValidEmail = EMAIL_REG_EXP.test(user.email);
        if (!isValidEmail) {
          copyValidState[key] = translate(
            'settingsNavigation.editPersonalInfo.mustValidEmail',
          );
          isAllFieldsValid = false;
        }
      } else if (key === 'phone') {
        const isValidPhone = PHONE_REG_EXP.test(user.phone);
        if (!isValidPhone) {
          copyValidState[key] = translate(
            'settingsNavigation.editPersonalInfo.phoneNumberShould',
          );
          isAllFieldsValid = false;
        }
      }
    });
    setValidationState(copyValidState);
    return isAllFieldsValid;
  };

  const getDataForUpdate = () => {
    const data = {};
    const changedFields = getChangedField();
    changedFields.forEach(field => {
      data[field] = user[field];
    });
    return data;
  };

  const onChange = (field, value) => {
    if (validationState[field]) {
      setValidationState({...validationState, ...{[field]: ''}});
    }
    setUser({...user, [field]: value});
  };

  const onSave = () => {
    if (validate()) {
      const changedFields = getChangedField();
      const formData = new FormData();
      changedFields.map(async k => {
        if (k === 'photo') {
          const path =
            Platform.OS === 'android'
              ? user[k].uri
              : user[k].uri.replace('file://', '');

          formData.append('photo', {
            uri: path,
            name: 'image.jpg',
            type: user[k].type,
          });
          console.log(RNFetchBlob.wrap(path));
        } else {
          formData.append(k, user[k]);
        }
      });
      props
        .changeUserProfile(formData)
        .then(res => {
          setIsDataChanged(false);
          props.navigation.navigate('Settings');
        })
        .catch(err => {
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

  const onPickPhoto = async () => {
    await getUserStoragePermissions();
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        includeBase64: true,
      },
      async photo => {
        const photoObj = photo?.assets[0];
        if (photoObj) {
          setUser({
            ...user,
            photo: {
              name: photoObj.fileName,
              uri: photoObj.uri,
              type: photoObj.type,
              base64: photoObj.base64,
            },
          });
        }
        onChange('photo', photoObj);
      },
    );
  };

  const connectFacebookAccount = async () => {
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
            const data = {
              email: resultFB.email,
              uid: resultFB.id,
            };
            props
              .setUserFacebook(data)
              .then(res => {
                setIsFbConnected(true);
              })
              .catch(err => {
                console.log('setUserFacebookError:', err);
              });
          }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={true}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerKeyboard}>
      <ScreenContainer>
        <MainHeader
          onLeftIconClick={props.navigation.goBack}
          title={translate(
            'settingsNavigation.editPersonalInfo.editPersonalInformation',
          )}
        />
        <TouchableOpacity onPress={onPickPhoto}>
          {user.photo || props.user?.specialistProfile.photo ? (
            <Image
              style={styles.avatar}
              source={{
                uri:
                  (user.photo && user.photo.uri) ||
                  props.user?.specialistProfile.photo,
              }}
            />
          ) : (
            <View style={styles.avatar}>
              <icons.AvatarIcon height={scaledHeight(35)} />
            </View>
          )}
          <View style={styles.plusIconAvatarContainer}>
            <icons.Plus color={colors.textWhite} />
          </View>
        </TouchableOpacity>
        <DefaultInput
          placeholder={translate(
            'settingsNavigation.editPersonalInfo.firstName',
          )}
          value={user.firstName}
          onChangeText={t => onChange('firstName', t)}
          invalidText={validationState.firstName}
        />
        <DefaultInput
          placeholder={translate(
            'settingsNavigation.editPersonalInfo.lastName',
          )}
          value={user.lastName}
          onChangeText={t => onChange('lastName', t)}
          invalidText={validationState.lastName}
        />
        <DefaultInput
          placeholder={translate('email')}
          value={user.email}
          onChangeText={t => onChange('email', t)}
          invalidText={validationState.email}
        />
        <DefaultInput
          placeholder={translate('phone')}
          value={user.phone}
          onChangeText={t => onChange('phone', t)}
          invalidText={validationState.phone}
        />
        <Text style={styles.authTextTitle}>
          {translate('settingsNavigation.editPersonalInfo.authorization')}:
        </Text>
        <View style={styles.facebookSocialContainer}>
          <View style={styles.facebookContainer}>
            <icons.ProfileFacebookIcon />
            <Text style={styles.facebookText}>{translate('facebook')}</Text>
          </View>
          {isFbConnected ? (
            <Text style={styles.facebookConnectedText}>Connected</Text>
          ) : (
            <TouchableOpacity
              style={styles.facebookConnectContainer}
              onPress={connectFacebookAccount}>
              <Text style={styles.facebookConnectText}>
                {translate('settingsNavigation.editPersonalInfo.connect')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <DefaultButton
            isTopMargin
            disabled={!isDataChanged}
            title={translate('save')}
            onPress={onSave}
          />
        </View>
      </ScreenContainer>
    </KeyboardAvoidingScrollView>
  );
};

export default EditPersonalInfo;
