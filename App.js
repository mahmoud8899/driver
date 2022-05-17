import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import LoginScrren from './src/Pages/LoginScreen/LoginScreen'
import SingUp from './src/Pages/LoginScreen/SingUp'



export default function App() {




  return <SafeAreaView  style={{flex : 1}}  >
    <SingUp    />
  </SafeAreaView>
}