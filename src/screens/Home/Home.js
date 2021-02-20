import React, { useState } from 'react';
import { View, Text } from 'react-native';
import style from './Home.style';

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    
    render() {
        return(
        <View style={style.container}>
            <Text >Hola, este es el home</Text>
        </View>            
        )
    }
}

// export default function Home({}) {
//     return (
//         <View style={{ height: style.container }}>
//             <Text >Hola, este es el home</Text>
//         </View>
//     )
// }