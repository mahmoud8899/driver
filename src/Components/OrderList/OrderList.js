import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Styles from '../../Pages/ProfileScrren/style'
import Icon from 'react-native-vector-icons/Ionicons'


export default function OrderList() {



    return <TouchableOpacity style={[Styles.OrderList, Styles.MarginBottomAndTop]}>
        <Text style={[Styles.FONT, Styles.Colorwhite]} >#39435</Text>
        <Text style={[Styles.FONT, Styles.Colorwhite]}>2 items (200kr) </Text>
        <View style={[Styles.City, Styles.MarginBottomAndTop]}>
            <Text style={[Styles.FONT, Styles.Colorwhite]}>City Uppsala</Text>
            <Icon name="chevron-down-outline" style={[Styles.Icons, Styles.Colorwhite]} />
        </View>
    </TouchableOpacity>
}