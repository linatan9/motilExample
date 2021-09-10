import React, {Component} from 'react';
import {View, Modal, Text, TouchableWithoutFeedback} from 'react-native';

import styles from './styles';

class BackdropModalContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {showModal, modalHeaderText, onHideModal, children} = this.props;
    return (
      <Modal transparent visible={showModal} onRequestClose={onHideModal}>
        <TouchableWithoutFeedback onPress={onHideModal}>
          <View style={styles.modalBecksideContainer} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer} pointerEvents="box-none">
          <View style={styles.modalWindow}>
            {children}
          </View>
        </View>
      </Modal>
    );
  }
}

export default BackdropModalContainer;
