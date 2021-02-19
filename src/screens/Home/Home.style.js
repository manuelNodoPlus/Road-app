import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Colors from "../../styles/Colors";
import {
    responsiveHeight as hp,
    responsiveWidth as wp,
    responsiveFontSize as fp
} from "react-native-responsive-dimensions";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default StyleSheet.create({
    container: {
        height: hp(100),
        width: wp(100),
    }
});