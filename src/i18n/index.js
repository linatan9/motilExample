import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance

import {I18nManager} from 'react-native';
import { LANGUAGES } from '../constants/data';

const translationGetters = {
  en: () => require('./translation/en.json'),
  sp: () => require('./translation/sp.json'),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = (option = null) => {
  // fallback if no available language fits
  let fallback = {languageTag: 'en', isRTL: false};

  if (option !== null) {
    fallback = option;
  }

  let {languageTag, isRTL} = fallback;
  languageTag = languageTag === LANGUAGES.ENGLISH ? 'en' : 'sp';
  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;
};

export {translate};

export default setI18nConfig;
