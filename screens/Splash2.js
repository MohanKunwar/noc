
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';



export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 5,
      quality: RNCamera.Constants.VideoQuality['288p'],
    }
  };


  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 1, base64: true }
      const data = await this.camera.takePictureAsync(options);
      console.log(data.base64)
      console.warn('takePicture ', data);
    }
  };

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth} 
        androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
      >

        <View style={{ bottom: 0 }}>
          <View
            style={{
              height: 56,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'center' }]}
              onPress={this.takePicture.bind(this)}
            >
              <Text style={styles.flipText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  }
});
