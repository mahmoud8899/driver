import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useEffect } from 'react'
import { USER_SAVE } from '../../Assistant/Types'


export const User = createContext()



export default function AuthAsync({ children }) {

    const [data, setData] = useState([])


    useEffect(() => {


        getMyObject = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(USER_SAVE)
                return jsonValue != null ? setData(JSON.parse(jsonValue)) : null
            } catch (e) {
                // read error
            }

            console.log('Done.')

        }

        getMyObject()

        return () => {
            setData([])
        }

    }, [])


    return <User.Provider value={{ data }}>
        {children}

    </User.Provider>



}