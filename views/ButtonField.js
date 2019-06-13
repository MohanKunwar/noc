import React from 'react';

import {
    View,
    Text,
    StyleSheet, TouchableOpacity,
} from 'react-native';
import R from "../resources";
// import { PropTypes } from 'prop-types';
// import Icon from 'react-native-vector-icons/MaterialIcons';

export default class ButtonField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }          
    } 

    render() {
        const {
            labelText,
            img,
            imgSize,
        } = this.props;
        return (
            <TouchableOpacity {...this.props} style={styles.button}>    
            <View   style={styles.container}>
            {/* {img===null?null:
            <Icon name ={img}  size={imgSize} color={R.colors.white}/>
            } */}
               {/* {img?<Image source={img} style={{width:imgSize, height:imgSize}}/>:null} */}
                <Text style={styles.label}>{labelText}</Text>
              
            </View>
            </TouchableOpacity>
        );
    }
}

// ButtonField.propTypes = {
//     labelText: PropTypes.string.isRequired,
//     img: PropTypes.string,
//     imgSize: PropTypes.number,
// };

export const styles = StyleSheet.create({
    container:{
      
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
        
    },

    button:{
        backgroundColor: '#01A7DB',
        marginTop:10,
        padding: 10,
        borderRadius: 5
    },

    label:{
        fontSize: 15,
        paddingLeft:5,
        color:R.colors.white
    }
});
