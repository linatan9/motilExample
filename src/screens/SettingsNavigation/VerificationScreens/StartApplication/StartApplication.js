import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions, FlatList, Image,
} from 'react-native';
import {colors, icons} from "../../../../constants";
import {translate} from '../../../../i18n';
import styles from './styles';
import { ScreenContainer } from '../../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../../components/DefaultButton/DefaultButton';
import CheckBox from 'react-native-elements/dist/checkbox/CheckBox';

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const StartApplication = (props) => {

  return (
    <ScreenContainer>
      <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('settingsNavigation.startApp')}/>
      <View style={{flex: 1, width: '100%', justifyContent: 'flex-start'}}>
        <CheckBox
          checked={true}
          title={translate('settingsNavigation.startApplication.requestInvitation')}
          checkedIcon={<icons.CheckedGreenCheckboxIcon height={20}/>}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20}/>}
          onPress={() => {}}
          containerStyle={{
            backgroundColor: colors.background,
            borderWidth: 0,
            paddingLeft: 0,
            marginLeft: 0,
          }}
          textStyle={{
            color: colors.textWhite,
            fontWeight: 'normal',
          }}
        />
        <CheckBox
          checked={false}
          title={translate('settingsNavigation.startApplication.submitBackgroundCheck')}
          checkedIcon={<icons.CheckedGreenCheckboxIcon height={20}/>}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20}/>}
          onPress={() => {}}
          containerStyle={{
            backgroundColor: colors.background,
            borderWidth: 0,
            paddingLeft: 0,
            marginLeft: 0,
          }}
          textStyle={{
            color: colors.textWhite,
            fontWeight: 'normal',
          }}
        />
      <DefaultButton
        title={translate('settingsNavigation.startApplication.startBackgroundCheck')}
        onPress={() => props.navigation.navigate('OnboardingProcess')}
        containerStyle={{marginTop: 10}}
      />
        <CheckBox
          checked={false}
          title={translate('settingsNavigation.startApplication.applicationProcessed')}
          checkedIcon={<icons.CheckedGreenCheckboxIcon height={20}/>}
          uncheckedIcon={<icons.UncheckedCheckboxIcon height={20}/>}
          onPress={() => {}}
          containerStyle={{
            backgroundColor: colors.background,
            borderWidth: 0,
            paddingLeft: 0,
            marginLeft: 0,
          }}
          textStyle={{
            color: colors.textWhite,
            fontWeight: 'normal',
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default StartApplication;
