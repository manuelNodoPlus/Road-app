import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import Colors from "../../styles/Colors";
import {
    responsiveHeight as hp,
    responsiveWidth as wp,
    responsiveFontSize as fp
} from "react-native-responsive-dimensions";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export default StyleSheet.create({
    forgotPassword: {
        width: wp(85),
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        textAlign: 'right',
        alignSelf: 'flex-end',
        marginBottom: 30
    },
    label: {
        fontFamily: 'Ionicons',
        color: 'black',
        marginTop: 10,
    },
    link: {
        fontWeight: 'bold',
        color: 'black',
        textAlignVertical: 'center',
        marginTop: 10,
    },
    or2: {
        // color: "rgba(255,255,255,1)",
        // borderColor: "rgba(151,151,151,1)",
        // borderWidth: 1,
        fontSize: 15,
        // fontFamily: "impact-regular",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
        // marginLeft: 134
    },
    buttonLogin: {
        width: '100%',
        // marginVertical: 10,
        backgroundColor: '#FD4242',
        height: hp(8),
        // borderColor: 'rgb(118, 118, 118);',
        // borderWidth: 1
        fontWeight: 'bold',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonFacebook: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'white',
        height: hp(8),
        borderColor: 'rgb(118, 118, 118);',
        borderWidth: 1
    },
    buttonGoogle: {
        width: '100%',
        // marginVertical: 10,
        backgroundColor: 'white',
        height: hp(8),
        borderColor: 'rgb(118, 118, 118);',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textLogin: {
        fontSize: 15,
        lineHeight: hp(5.5),
        color: 'white'
    },
    text: {
        fontSize: 15,
        lineHeight: hp(5.5),
        color: 'rgb(118, 118, 118);',
        textAlignVertical: 'center',
    },
    socialIcons: {
        width: 30,
        height: 30,
        left: 0
    },
    scrollView: {
        marginHorizontal: 0,
        height: hp(100),
        // width: wp('100%'),
    },
    activity: {
        position: 'absolute',
        backgroundColor: 'black',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
});