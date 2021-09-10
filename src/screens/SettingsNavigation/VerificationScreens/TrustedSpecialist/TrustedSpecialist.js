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

const iamgeSizeheight = Dimensions.get('window').width - 40;

export  const TrustedSpecialist = (props) => {

  return (
    <ScreenContainer>
      <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('settingsNavigation.trustedSpecialist.trustedSpecialistProgram')}/>
      <Text style={styles.title}>{translate('settingsNavigation.trustedSpecialist.joinTrusted')}</Text>
      <Text style={[styles.title, {marginTop: 15}]}>{translate('settingsNavigation.trustedSpecialist.motilCustomers')}</Text>
      <Text style={[styles.title, {marginTop: 15}]}>{translate('settingsNavigation.trustedSpecialist.sellMore')}</Text>
      <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
      <DefaultButton
        title={translate('settingsNavigation.startApp')}
        onPress={() => props.navigation.navigate('StartApplication')}
        containerStyle={{marginTop: 10}}
      />
      </View>
    </ScreenContainer>
  );
};

export default TrustedSpecialist;
