import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = size => Math.ceil(size * scale);

export const scaledHeight = componentHeight =>
  Math.ceil(componentHeight * scale);

export const header20Black = {
  fontSize: scaledSize(20),
};

export const header20Bold = {
  fontSize: scaledSize(20),
};

export const underHeader13Black = {
  fontSize: scaledSize(13),
};

export const underHeaderLink = {
  fontSize: scaledSize(13),
};

export const body16Regular = {
  fontSize: scaledSize(16),
};

export const body16Medium = {
  fontSize: scaledSize(16),
};

export const header32Medium = {
  fontSize: scaledSize(32),
};

export const reportIdDisplay = {
  fontSize: scaledSize(12),
};

export const compactText12 = {
  fontSize: scaledSize(12),
};

export const mainShadowBig = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 7,
  },
  shadowOpacity: 0.41,
  shadowRadius: 2.11,
  elevation: 14,
};

export const mainShadowSmall = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
};
