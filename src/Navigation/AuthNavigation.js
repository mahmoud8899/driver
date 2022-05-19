import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { USER_SAVE } from '../Assistant/Types'
import HomeScrren from '../Pages/HomeScreen/HomeScreen'
import LoginScrren from '../Pages/LoginScreen/LoginScreen'
import { User } from '../Components/AsyncStorage/AsyncStorage'


const Stack = createNativeStackNavigator()


export default function Auth() {


    const { data } = useContext(User)


    //  console.log('data',data)





    return <Stack.Navigator>
        {!data?.username &&
            <Stack.Screen name='Auth' component={LoginScrren} options={{
                headerShown: false
            }} />

        }



        <Stack.Screen name='HomeScreen' component={HomeScrren} options={{
            headerShown: false
        }} />
    </Stack.Navigator>
}