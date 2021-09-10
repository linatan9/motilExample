import React, {Component} from 'react';
import {View, Modal, Text, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import {colors, icons} from "../../constants";


import styles from './styles';
const BlockerLoader = (props) => {
  return (
    <Modal transparent visible={props.loading}>
      <TouchableWithoutFeedback>
        <View style={styles.modalBecksideContainer} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer} pointerEvents="box-none">
        <View style={styles.modalWindow}>
          <ActivityIndicator size={'large'} color={colors.textWhite} />
        </View>
      </View>
    </Modal>
  );
};

export default BlockerLoader
