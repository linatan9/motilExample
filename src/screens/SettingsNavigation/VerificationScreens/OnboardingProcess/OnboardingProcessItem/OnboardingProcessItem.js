import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors, icons} from '../../../../../constants';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import CheckBox from 'react-native-elements/dist/checkbox/CheckBox';
import LinearGradient from 'react-native-linear-gradient';
import DefaultButton from '../../../../../components/DefaultButton/DefaultButton';

const OnboardingProcessItem = ({
  number,
  title,
  buttonTitle,
  routeName,
  isFinished,
  slug,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.itemContainer,
        {borderColor: isFinished ? colors.yellow : colors.inactive},
      ]}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.title}>{title}</Text>
      <DefaultButton
        notActive={!isFinished}
        title={buttonTitle}
        onPress={() => {
          console.log(slug);
          //navigation.navigate('OnboardingProcess');
        }}
        containerStyle={{marginTop: 10}}
      />
    </View>
  );
};

export default OnboardingProcessItem;
