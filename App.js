import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import LoginScrren from './src/Pages/LoginScreen/LoginScreen'
import SingUp from './src/Pages/LoginScreen/SingUp'
import {NavigationContainer} from '@react-navigation/native'
import HomeNavigation from './src/Navigation/HomeNavigation'

export default function App() {




  return <SafeAreaView  style={{flex : 1}}  >
    <NavigationContainer>
      <HomeNavigation />

    </NavigationContainer>
   
  </SafeAreaView>
}