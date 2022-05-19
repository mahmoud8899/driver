import React from 'react'
import { View, TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';


export default function Input(props) {
    const {
        AddStyles,
        placeholder,
        onChangeText,
        value,
        secureTextEntry,
    } = props




    return <View>
        <TextInput
            style={AddStyles ? AddStyles : Styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            // placeholderTextColor='black'
            value={value}
        />

    </View>
}


const Styles = ScaledSheet.create({

    input : {

        height : '50@s',
        borderColor : 'black',
        borderWidth : 1,
        paddingLeft : '10@s',
        borderRadius : '4@s',
        fontSize : '19@s',
        color  : 'black'
    },
})