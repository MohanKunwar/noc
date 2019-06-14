
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';



export default class TakePicutre extends React.Component {
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


    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 1, base64: true }
            const data = await this.camera.takePictureAsync(options)
            console.log(data.base64)
            this.props.imageFile(data)

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
                <View>
                    <Text onPress={this.props.cancel} style={styles.Canclecamera}>X</Text>
                </View>
                    <View
                        style={{
                            height: 56,
                            backgroundColor: 'transparent',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            // alignSelf: 'flex-end',
                          
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'center' }]}
                            onPress={this.takePicture.bind(this)}
                        >
                            <Text style={styles.flipText}> SNAP </Text>
                        </TouchableOpacity>
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
        position: 'relative',
        bottom: 0,
        // height: 50,
        width: 100 + '%',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        // marginTop: 200,
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
    },
    Canclecamera:{
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
        position: 'relative',
        // top: 100,
        // marginTop: 30,
        left: 20,
    }
});
