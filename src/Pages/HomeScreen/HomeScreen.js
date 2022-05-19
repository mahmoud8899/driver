import React ,{useContext}from "react"
import { View, Text } from 'react-native'
import Styles from './style'
import OrdersAvailable from "../../Components/OrdersAvailable/OrdersAvailable"
import { FlatListComponent } from "../../Components/FlatList/FlatList"
import { HomeScreen } from '../../Assistant/Data'
import {User} from '../../Components/AsyncStorage/AsyncStorage'
export default function HomeScrren() {


    const {data} = useContext(User)


    
    function renderItem(item) {


        return <OrdersAvailable item={item} />
    }



    return <View style={Styles.container} >
        <View style={Styles.marginBottomAndTop}>
            <Text style={[Styles.font]} >Welcom : {data?.username}</Text>
        </View>

        <View style={[Styles.marginBottomAndTop, Styles.Total]}>
            <Text style={[Styles.font]} >Total : 20$</Text>
        </View>

        <View style={Styles.marginBottomAndTop}>
            <Text style={[Styles.font, Styles.extraFont]}>orders now available </Text>
        </View>

        <View style={{ flex: 1 }} >


            <FlatListComponent
                data={HomeScreen}
                renderItem={renderItem}


            />








        </View>
    </View>
}