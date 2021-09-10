import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors, icons, images} from '../../constants';
import Swiper from 'react-native-swiper';
import {translate} from '../../i18n';
import styles from './styles';
import {ScreenContainer} from '../../components/ScreenContainer/ScreenContainer';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import SplashScreen from 'react-native-splash-screen';
import {checkOnboardingComplete} from '../../constants/helpers';

export const Intro = props => {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    console.log(swiperRef, 'swiperRef');
  }, [swiperRef]);

  const onSkip = isDone => {
    const isCompleteOnboarding = checkOnboardingComplete(
      props.specialistNotifications,
    );
    const routeName = isCompleteOnboarding ? 'Main' : 'OnboardingNavigation';
    if (isDone) {
      props
        .setPassedIntro()
        .then(res => {
          props.navigation.navigate(routeName);
        })
        .catch(e => console.log(e));
    } else {
      props.navigation.navigate(routeName);
    }
  };

  return (
    <ScreenContainer verticalCenter>
      <TouchableOpacity
        style={styles.skipContainer}
        onPress={() => onSkip(false)}>
        <Text style={styles.skipText}>{translate('intro.skip')}</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        index={index}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}>
        <View style={styles.slide}>
          <images.IntroSlide1 />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{translate('intro.bookMore')}</Text>
            <Text style={styles.subtitle}>{translate('intro.motilGives')}</Text>
            <Text style={styles.subtitle}>{`- ${translate(
              'intro.motilGives',
            )}`}</Text>
            <Text style={[styles.subtitle, {marginTop: 0}]}>{`- ${translate(
              'intro.customizedOnlineBookings',
            )}`}</Text>
            <Text style={[styles.subtitle, {marginTop: 0}]}>{`- ${translate(
              'intro.emailSmsReminders',
            )}`}</Text>
            <Text style={[styles.subtitle, {marginTop: 0}]}>{`- ${translate(
              'intro.seamlessMobilePayments',
            )}`}</Text>
          </View>
          <View style={styles.buttonCOntainer}>
            <DefaultButton
              title={translate('next')}
              onPress={() => swiperRef.current.scrollBy(1)}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <images.IntroSlide2 />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              {translate('intro.accessLocalCustomers')}
            </Text>
            <Text style={styles.subtitle}>
              {translate('intro.ourAlgorithms')}
            </Text>
          </View>
          <View style={styles.buttonCOntainer}>
            <DefaultButton
              title={translate('next')}
              onPress={() => swiperRef.current.scrollBy(1)}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <images.IntroSlide3 />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              {translate('intro.noAddedTransactionFees')}
            </Text>
            <Text style={styles.subtitle}>{translate('intro.useMotil')}</Text>
          </View>
          <View style={styles.buttonCOntainer}>
            <DefaultButton
              title={translate('next')}
              onPress={() => swiperRef.current.scrollBy(1)}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <images.IntroSlide4 />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{translate('intro.yourBusiness')}</Text>
            <Text style={styles.subtitle}>
              {translate('intro.streamlineYourProcesses')}
            </Text>
          </View>
          <View style={styles.buttonCOntainer}>
            <DefaultButton
              title={translate('next')}
              onPress={() => swiperRef.current.scrollBy(1)}
            />
          </View>
        </View>
        <View style={styles.slide}>
          <images.IntroSlide5 />
          <View style={styles.contentContainer}>
            <Text style={styles.title}>{translate('intro.focusOn')}</Text>
            <Text style={styles.subtitle}>{translate('intro.letMotil')}</Text>
          </View>
          <View style={styles.buttonCOntainer}>
            <DefaultButton title={'Done'} onPress={() => onSkip(true)} />
          </View>
        </View>
      </Swiper>
    </ScreenContainer>
  );
};

export default Intro;
