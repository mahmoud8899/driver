import React from "react"
import { View, Text ,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Styles from './style'
import ButtonComponent from '../../Components/Button/Button'
import { USER_SAVE } from "../../Assistant/Types"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function ProfileScreen(props) {



    // console.log('show me props :',props)


    const LogOut = () =>{

        console.log('User Log out...')

        return AsyncStorage.removeItem(USER_SAVE)
    }

    return <View style={Styles.container}>
        <View style={Styles.ImageContainer}>
            <View style={Styles.image}>
                <Text style={Styles.imageColor} >M</Text>
                <Text style={[Styles.imageColor, Styles.marginLeft]} >A</Text>
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={Styles.imageColor}> Mahmoud Talat</Text>
            </View>
        </View>

        <View style={Styles.Button}>

            <TouchableOpacity style={[Styles.order, Styles.MarginBottomAndTop]} 
            onPress={()=> props.navigation.navigate('OrderHistory')}
            >
                <View>
                    <Icon name='documents-outline' style={Styles.Icons} />
                </View>
                <View style={Styles.marginLeft}>
                    <Text style={[Styles.imageColor, Styles.color]} >Order History</Text>
                </View>

                <View style={{ marginLeft: 'auto' }}>
                    <Icon name='chevron-forward-outline' style={Styles.Icons} />
                </View>


            </TouchableOpacity>

            <TouchableOpacity style={[Styles.order, Styles.MarginBottomAndTop] }    onPress={()=> props.navigation.navigate('Account')} >
                <View>
                    <Icon name='documents-outline' style={Styles.Icons} />
                </View>
                <View style={Styles.marginLeft}>
                    <Text style={[Styles.imageColor, Styles.color]} >Account</Text>
                </View>

                <View style={{ marginLeft: 'auto' }}>
                    <Icon name='chevron-forward-outline' style={Styles.Icons} />
                </View>


            </TouchableOpacity>
        </View>




        <View style={Styles.Button}>
            <ButtonComponent Title='log out' onPress={LogOut} />
        </View>


    </View>
}