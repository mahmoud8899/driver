import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { ScaledSheet } from 'react-native-size-matters';

export default function ButtonComponent(props) {
    const { Title } = props


    return <TouchableOpacity style={Styles.Button}>
        <Text style={Styles.textButton}
        > {Title}</Text>
    </TouchableOpacity>
}



const Styles = ScaledSheet.create({
    Button: {
        backgroundColor: 'black',
        height: '60@s',
        marginTop: '30@s',
        borderRadius : '4@s',
    },
    textButton: {
        color: 'white',
        lineHeight: '60@s',
        textAlign: 'center',
        fontSize : '20@s'
    }

})