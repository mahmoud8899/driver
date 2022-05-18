import React from "react"
import { View, Text, TouchableOpacity } from 'react-native'
import ButtonComponent from "../../../Components/Button/Button"
import Input from '../../../Components/Input/Input'
import Styles from "../style"
import Icon from 'react-native-vector-icons/Ionicons'
import Header from '../../../Components/Header/Header'

export default function Account({ navigation }) {



    return <View style={[Styles.container, Styles.Padding]}>

        <Header Title='Account' onPress={() => navigation.goBack()} />

        <View style={Styles.Button}>
        <View style={Styles.MarginBottomAndTop} >
            <Text  style={Styles.FONT}>first name</Text>
            <Input placeholder='Mahmoud' value='Mahmoud' />

        </View>

        <View style={Styles.MarginBottomAndTop}>
            <Text style={Styles.FONT}>Last name</Text>
            <Input placeholder='Talat' value='Talat' />

        </View>
        </View>


        <View style={Styles.Button}>
            <ButtonComponent Title='Change' />
        </View>

    </View>
}