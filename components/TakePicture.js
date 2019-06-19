
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
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
                        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.flipButton}>
                            <Icon style={styles.icon}
                                                name={'vinyl'}
                                                size={50}
                                                color={'#01A7DB'}
                                            />
                        </TouchableOpacity>
                    </View>
            </RNCamera>
        );
    }

    render() {
        return (
            <Modal
            transparent={true}
            animationType={'none'}
            onRequestClose={() => { console.log('close modal') }}>
                <View style={styles.container}>{this.renderCamera()}</View>
                </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
    },
    flipButton: {
        flex: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: '#01A7DB',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 30,
    },
    
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    Canclecamera:{
        color: 'red',
        fontSize: 20,
        fontWeight: '600',
        position: 'relative',
        alignSelf: 'flex-end',
        paddingRight: 20,
        top: 10
    }
});
