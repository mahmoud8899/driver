import React from "react"
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from '../../Pages/ProfileScrren/style'

export default function Header(props) {
    const { onPress, Title } = props



    return <View style={Styles.header}>
        <TouchableOpacity style={Styles.IconLeft} onPress={onPress}>
            <Icon name='arrow-back-outline' style={Styles.Icons} />

        </TouchableOpacity>
        {Title && <Text style={[Styles.marginLeft, Styles.imageColor, Styles.color]}>{Title}</Text>}
    </View>

}