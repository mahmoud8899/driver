import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ButtonComponent from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import ForgotPassword from './ForgotPassword'
import Styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_SAVE } from '../../Assistant/Types'


export default function LoginScrren() {


    const [data, setData] = useState({
        username: '',
        password: ''
    })





    // console.log('show username....', data)

    function HandleData() {

        if (data.username?.length > Number(0) || data.password?.length > Number(0)) {
            return AsyncStorage.setItem(USER_SAVE, JSON.stringify(data))
        }

        return console.log('Empty')





    }


    return <View style={Styles.Container}>


        <View style={Styles.row}>
            <Text style={[Styles.Font, Styles.extraSize, Styles.ExtraFont]}>Lets Sign you in</Text>
            <Text style={[Styles.Font]}>Welcome Back,</Text>
            <Text style={[Styles.Font]}>You have been missed</Text>
        </View>

        <View style={Styles.marginTopDefault}>
            <View style={Styles.Input} >
                <Input
                    placeholder='Email ,phone & username'
                    onChangeText={(value) => setData({ ...data, username: value })}
                    value={data.username}
                />
            </View>
            <View style={Styles.Input} >
                <Input
                    placeholder='Password'
                    onChangeText={(value) => setData({ ...data, password: value })}
                    value={data.password}
                    secureTextEntry={true}

                />
            </View>

            <View style={Styles.Input}>
                <ForgotPassword />
            </View>


            <ButtonComponent
                Title='Sing in'
                onPress={HandleData}
            />


            <View style={[Styles.or, Styles.marginTopDefault]}>
                <Text style={Styles.textor}></Text>
                <Text>OR</Text>
                <Text style={Styles.textor}></Text>
            </View>

            <View style={[Styles.account, Styles.marginTopDefault]}>
                <Text style={Styles.accountFont}>Don't have an account? </Text>
                <Text style={[Styles.accountFont, Styles.extraSize]}> Register Now</Text>
            </View>



        </View>
    </View>
}