import React from 'react';
import {SafeAreaView, Text, View, Platform} from 'react-native';
import styles from './styles'

export const ScreenContainer = (props) => {
  const isIos =  Platform.OS === 'ios';

  const {
  } = props;
  return (
    <SafeAreaView style={[styles.container, props.verticalCenter ? styles.verticalCenter : {}]}>
      {
        isIos ? (
          <View style={[styles.container, props.verticalCenter ? styles.verticalCenter : {}]}>
            {props.children}
          </View>
        ) : (
        <>
          {props.children}
        </>
        )
      }
    </SafeAreaView>
  )
};
