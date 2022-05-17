import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import ButtonComponent from '../../Components/Button/Button'
import Input from '../../Components/Input/Input'
import ForgotPassword from './ForgotPassword'
import Styles from './style'



export default function SingUp() {




    return <View style={Styles.Container}>

        <ScrollView >
            <View style={Styles.row}>
                <Text style={[Styles.Font, Styles.extraSize, Styles.ExtraFont]}>Lets Register</Text>
                <Text style={[Styles.Font, Styles.extraSize, Styles.ExtraFont]}>Account,</Text>
                <Text style={[Styles.Font]}>Hello user, you have</Text>
                <Text style={[Styles.Font]}> a greatful journey</Text>
               
            </View>






            <View style={Styles.Input} >
                <Input
                    placeholder='Name'
                />
            </View>


            <View style={Styles.Input} >
                <Input
                    placeholder='Buissness name'
                />
            </View>

            <View style={Styles.Input} >
                <Input
                    placeholder='Phone'
                />
            </View>

            <View style={Styles.Input} >
                <Input
                    placeholder='Email'
                />
            </View>


            <View style={Styles.Input} >
                <Input
                    placeholder='Password'
                />
            </View>









            <ButtonComponent
                Title='Sing in'
            />


            

            <View style={[Styles.account, Styles.marginTopDefault]}>
                <Text style={Styles.accountFont}>Already have an account  </Text>
                <Text style={[Styles.accountFont, Styles.extraSize]}> ? Login</Text>
            </View>

        </ScrollView>

    </View>


}