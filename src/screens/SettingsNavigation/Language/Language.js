import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList,
} from 'react-native';
import {colors, icons} from "../../../constants";
import styles from './styles';
import { ScreenContainer } from '../../../components/ScreenContainer/ScreenContainer';
import { MainHeader } from '../../../components/MainHeader/MainHeader';
import DefaultButton from '../../../components/DefaultButton/DefaultButton';
import LanguageItem from './components/LanguageItem/LanguageItem';
import { LANGUAGES } from '../../../constants/data';
import {translate} from '../../../i18n';

const iamgeSizeheight = Dimensions.get('window').width - 40;

const languagesData = [
  {
    title: 'English',
    subTitle: 'English',
    id: LANGUAGES.ENGLISH,
  },
  {
    title: 'Spanish',
    subTitle: 'Española',
    id: LANGUAGES.SPANISH,
  },
];

export  const Language = (props) => {
  return (
    <ScreenContainer>
      <MainHeader onLeftIconClick={props.navigation.goBack} title={translate('settingsNavigation.language')}/>
      <FlatList
        style={{width: '100%'}}
        data={languagesData}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <LanguageItem onChange={props.changeLanguage} checkedLanguageId={props.selectedLanguage} key={index} {...item}/>
        )}
        keyExtractor={(item) => item.title}
      />
    </ScreenContainer>
  );
};

export default Language;
