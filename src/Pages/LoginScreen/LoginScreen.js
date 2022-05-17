import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ButtonComponent from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import ForgotPassword from './ForgotPassword'
import Styles from './style'



export default function LoginScrren() {




    return <View style={Styles.Container}>


        <View style={Styles.row}>
            <Text style={[Styles.Font, Styles.extraSize,Styles.ExtraFont]}>Lets Sign you in</Text>
            <Text style={[Styles.Font]}>Welcome Back,</Text>
            <Text style={[Styles.Font]}>You have been missed</Text>
        </View>

        <View style={Styles.marginTopDefault}>
            <View style={Styles.Input} >
                <Input
                    placeholder='Email ,phone & username'
                />
            </View>
            <View style={Styles.Input} >
                <Input
                    placeholder='Password'
                />
            </View>

            <View style={Styles.Input}>
                <ForgotPassword   />
            </View>


            <ButtonComponent
                Title='Sing in'
            />


            <View style={[Styles.or,Styles.marginTopDefault]}>
                <Text style={Styles.textor}></Text>
                <Text>OR</Text>
                <Text style={Styles.textor}></Text>
            </View>

            <View style={[Styles.account,Styles.marginTopDefault]}>
                <Text style={Styles.accountFont}>Don't have an account? </Text>
                <Text style={[Styles.accountFont,Styles.extraSize]}> Register Now</Text>
            </View>



        </View>
    </View>
}