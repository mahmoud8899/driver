import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import LoginScrren from '../Pages/LoginScreen/LoginScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScrren from '../Pages/HomeScreen/HomeScreen'
import ProfileNavigation from './ProfileNavigation'
import Auth from './AuthNavigation'



const Tab = createBottomTabNavigator()


export default function HomeNavigation() {




    return <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'home-outline'
                        : 'home-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused
                        ? 'person-outline'
                        : 'person-outline'
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'red',
            tabBarInactiveTintColor: 'gray',
        })}

    >

        <Tab.Screen name='Home' component={Auth} options={{
            headerShown: false
        }} />
        <Tab.Screen name='Profile' component={ProfileNavigation} options={{
            headerShown: false
        }} />





    </Tab.Navigator>
}