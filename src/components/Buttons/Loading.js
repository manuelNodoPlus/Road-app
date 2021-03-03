import React from 'react';
import { Text, TouchableOpacity, View, TouchableHighlight  } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../../styles/Colors';
import {
    responsiveHeight as hp,
    responsiveWidth as wp,
    responsiveFontSize as fp
} from "react-native-responsive-dimensions";
export default function Loading({ navigation, loading, onPress, content, buttonStyle }) {

    return !loading ? (
        <TouchableHighlight 
            style={buttonStyle}
            onPress={() => onPress()}
        >
            {content()}
        </TouchableHighlight >
        // {loadingButtonGoogle ? (
        //     <View style={{ backgroundColor: Colors.white, width: '100%', height: hp(8), borderRadius: 5, borderColor: 'rgb(118, 118, 118);', borderWidth: 1, }}>
        //         {/* <LottieView style={{}} source={require('../assets/animations/loading_button_red.json')} autoPlay loop /> */}
        //     </View>
        // ) : (
        //         <Button theme={{ colors: { primary: Colors.primary } }} 
        //         // icon={({ size, color }) => (
        //         //     <Image
        //         //         source={require('../assets/google.png')}
        //         //         style={{ width: size, height: size, tintColor: '#D84B37' }}
        //         //     />
        //         // )} 
        //         style={styles.buttonGoogle} labelStyle={styles.text} onPress={() => onGoogleButtonPress()}>
        //             Continúa con Google
        //         </Button>
        //     )}
    ) : (
            <View
                style={{ backgroundColor: Colors.white, width: '100%', height: hp(8), borderRadius: 5, borderColor: 'rgb(118, 118, 118);', borderWidth: 1, }}>
                <LottieView style={{}} source={require('../../assets/animations/loading_button_red.json')} autoPlay loop />
            </View>
        )
}