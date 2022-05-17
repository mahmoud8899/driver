import {TouchableOpacity,Text} from 'react-native'
import React  from 'react'
import { ScaledSheet } from 'react-native-size-matters';

export default function ForgotPassword(props){
const {onPress} = props



    return  <TouchableOpacity style={Styles.Forgot} onPress={onPress} >
        <Text style={Styles.font} > 
            Forgot Password ?
        </Text>

    </TouchableOpacity>
}

const Styles  = ScaledSheet.create({

    Forgot: {

        flexDirection  : 'row-reverse'

    },
    font: {
        fontSize : '14@s',
        fontWeight : 'bold',
        color  : 'black'
    }

})