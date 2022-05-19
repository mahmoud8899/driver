import React from 'react'
import { FlatList } from 'react-native'




export function FlatListComponent(props) {
    const { data, renderItem } = props



    return <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}

    />
}