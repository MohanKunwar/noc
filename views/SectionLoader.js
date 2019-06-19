import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const sectionLoader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <View style={styles.modalBackground}>
    <View style={styles.activityIndicatorWrapper}>
      <ActivityIndicator
        animating={loading} />
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff'
  },
  activityIndicatorWrapper: {
    // backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default sectionLoader;