import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import LoginScrren from './src/Pages/LoginScreen/LoginScreen'
import SingUp from './src/Pages/LoginScreen/SingUp'
import {NavigationContainer} from '@react-navigation/native'
import HomeNavigation from './src/Navigation/HomeNavigation'
import AuthAsync  from './src/Components/AsyncStorage/AsyncStorage'

export default function App() {




  return <SafeAreaView  style={{flex : 1}}  >
    <AuthAsync>
    <NavigationContainer>
      <HomeNavigation />

    </NavigationContainer>
    </AuthAsync>
    
   
  </SafeAreaView>
}