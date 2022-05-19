import React from 'react'
import { View, Text } from 'react-native'
import Styles from '../../Pages/HomeScreen/style'
import ButtonComponent from '../Button/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import openMap from 'react-native-open-maps'

export default function OrdersAvailable(props) {
    const { item } = props


    // console.log('item',item.item)



    function TheMaps(option){

        openMap({ latitude: option[0], longitude: option[1] });

        return 
    }


    return <View style={[Styles.orderavailable, Styles.marginBottomAndTop]} key={item.item._id}>
        <Text style={[Styles.font, Styles.extraFont, Styles.theColor, Styles.marginBottomAndTop]} >{item.item.name} </Text>
        <Text style={[Styles.font, Styles.theColor, Styles.marginBottomAndTop]}  >Address </Text>

        <View style={[Styles.address, Styles.marginBottomAndTop]}>
            <View style={Styles.containericon}  >
                <Icon name='navigate-outline' style={[Styles.icon, Styles.theColor]} />
            </View>
            <View>
                <Text style={[Styles.font, Styles.theColor]} >{item.item.address}</Text>
            </View>
        </View>



        <ButtonComponent
            Title='Confirm'
       
        />


        <ButtonComponent
            Title='See the Address off restaurant'
            onPress={()=> TheMaps(item.item.location)}

        />




    </View>

}