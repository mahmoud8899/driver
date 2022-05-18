import React from "react"
import { View, Text, TouchableOpacity ,ScrollView } from 'react-native'
import ButtonComponent from "../../../Components/Button/Button"
import Input from '../../../Components/Input/Input'
import Styles from "../style"
import Header from '../../../Components/Header/Header'
import OrderList from "../../../Components/OrderList/OrderList"

export default function OrderHistory({ navigation }) {



    return <View style={[Styles.container, Styles.Padding]}>

        <Header Title='Order History' onPress={() => navigation.goBack()} />

        <View style={Styles.Button}>

          <ScrollView> 
          <OrderList  />
         <OrderList  />

         <OrderList  />
         <OrderList  />
         <OrderList  />
         <OrderList  />
         <OrderList  />
          </ScrollView>

        
        </View>



    </View>
}