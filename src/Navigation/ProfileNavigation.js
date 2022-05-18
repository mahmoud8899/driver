import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../Pages/ProfileScrren/ProfileScrren'
import OrderHistory from '../Pages/ProfileScrren/Order/Order'
import Account from '../Pages/ProfileScrren/Account/Account'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
const Stack = createNativeStackNavigator()


export default function ProfileNavigation() {



    return  <Stack.Navigator >
            <Stack.Screen name='ProfileScrren' component={ProfileScreen} options={{headerShown : false}} />
            <Stack.Screen name='OrderHistory' component={OrderHistory} options={{headerShown : false}} />
            <Stack.Screen name='Account' component={Account}  options={{headerShown : false}}/>
        </Stack.Navigator>
 

}

