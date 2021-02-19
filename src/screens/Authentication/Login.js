import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
// import Header from '../components/Header';
import { Button, ActivityIndicator } from 'react-native-paper';
import TextInput from '../../components/Inputs/TextInput';
import LottieView from 'lottie-react-native';
import {
    emailValidator,
    passwordEmptyValidator,
    authError,
    showNotification,
} from '../../core/Utils/Utils';
import {
    responsiveHeight as hp,
    responsiveWidth as wp,
    responsiveFontSize as fp
} from "react-native-responsive-dimensions";
// import AwesomeAlert from 'react-native-awesome-alerts';
import Colors from '../../styles/Colors';
//-----------------------------Google Signing-------------------------
import { GoogleSignin } from '@react-native-community/google-signin';
import Firebase from '../../core/Firebase/firebase';

//-----------------------------Facebook Signing-------------------------
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
export default function Login({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [showLoading, setShowLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingButtonGoogle, setLoadingButtonGoogle] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('false');
    GoogleSignin.configure({
        webClientId: '1014237379367-1apkgu35r0h05hbch65u1ujs46uq678s.apps.googleusercontent.com', // From Firebase Console Settings
    });


    //-----------------------------Google Signing-------------------------
    async function onGoogleButtonPress() {
        setLoadingButtonGoogle(true);
        try {
            // Get the users ID token
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            const { accessToken, idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            // const googleCredential = Firebase.googleProvider auth.GoogleAuthProvider.credential(idToken, accessToken);
            
            // Sign-in the user with the credential
            
            console.log(idToken, accessToken, 'idToken, accessTokenidToken, accessTokenidToken, accessTokenidToken, accessToken')
            Firebase.auth.signInWithCredential(Firebase.googleProvider.credential(idToken, accessToken)).then(() => {

                Firebase.db.ref(`/users/${Firebase.auth.currentUser.uid}`).update({
                    uid: Firebase.auth.currentUser.uid,
                    email: Firebase.auth.currentUser.email,
                    emailVerified: Firebase.auth.currentUser.emailVerified,
                    providerData: Firebase.auth.currentUser.providerData,
                    createdAt: Firebase.serverValue.TIMESTAMP
                });
            }).catch((error) => {
                setLoadingButtonGoogle(false);
                showNotification(authError(error.code), 'info');
            });
        } catch (e) {
            console.log('Error login with Google: ', e)
            setLoadingButtonGoogle(false);
            showNotification('Lo sentimos ocurrió un error, intentalo más tarde', 'info');
        }
    }

    //-------------------------------Phone number---------------------------------------------------
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');
    // async function signInWithPhoneNumber(phoneNumber) {
    //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //     const a = await confirmation.confirm('123456');
    //     console.log(a)
    // }
    const login = async () => {
        try {
            setLoading(true);
            const emailError = emailValidator(email.value);
            const passwordError = passwordEmptyValidator(password.value);
            if (emailError || passwordError) {
                // setName({ ...name, error: nameError });
                setEmail({ ...email, error: emailError });
                setPassword({ ...password, error: passwordError });
                setLoading(false);
                return;
            } else {


                await Firebase.auth.signInWithEmailAndPassword(email.value, password.value).then(async () => {
                    
                    Firebase.db.ref(`/users/${Firebase.auth.currentUser.uid}`).update({
                        uid: Firebase.auth.currentUser.uid,
                        email: Firebase.auth.currentUser.email,
                        emailVerified: Firebase.auth.currentUser.emailVerified,
                        providerData: Firebase.auth.currentUser.providerData,
                        createdAt: Firebase.serverValue.TIMESTAMP
                    });

                    if (!Firebase.auth.currentUser.emailVerified) {
                        await Firebase.auth.signOut();
                        showNotification('Por favor, verifica tu correo primero', 'info');
                    }
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    showNotification(authError(error.code), 'info');
                });
                // setShowLoading(false);


            }
        } catch (e) {
            setLoading(false);
            showNotification('Lo sentimos ocurrió un error, intentalo más tarde', 'info');
        }
    };
    return (
        <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} >
            <View style={{ backgroundColor: 'white', height: '100%' }}>

                <StatusBar backgroundColor='white' barStyle="dark-content" />
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    {/* <Logo /> */}
                    {/* <Image
                        source={require('../assets/logo.png')}
                        style={{
                            width: '100%', height: hp(19),
                            marginTop: 40,
                            alignSelf: "center", alignSelf: 'center'
                        }}
                        resizeMode="center"
                    /> */}
                    {/* <Header  >Iniciar sesión en TibaPlus</Header> */}

                    <TextInput
                        label="Correo"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={text => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        errorText={email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Contraseña"
                        returnKeyType="done"
                        value={password.value}
                        onChangeText={text => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        errorText={password.error}
                        secureTextEntry
                    />

                    <View style={styles.forgotPassword}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Reset')}
                        >
                            <Text style={styles.label}>Recuperar contraseña</Text>
                        </TouchableOpacity>
                    </View>
                    {loading ? (
                        <View style={{ backgroundColor: Colors.primary, width: '100%', height: hp(8), borderRadius: 5 }}>
                            {/* <LottieView style={{}} source={require('../assets/animations/loading_button.json')} autoPlay loop /> */}
                        </View>
                    ) : (
                            <Button theme={{ colors: { primary: Colors.white } }} style={styles.buttonLogin} labelStyle={styles.textLogin} onPress={() => login()}>
                                Iniciar sesión
                            </Button>
                        )}


                    <Text style={styles.or2}>O</Text>
                    {loadingButtonGoogle ? (
                        <View style={{ backgroundColor: Colors.white, width: '100%', height: hp(8), borderRadius: 5, borderColor: 'rgb(118, 118, 118);', borderWidth: 1, }}>
                            {/* <LottieView style={{}} source={require('../assets/animations/loading_button_red.json')} autoPlay loop /> */}
                        </View>
                    ) : (
                            <Button theme={{ colors: { primary: Colors.primary } }} 
                            // icon={({ size, color }) => (
                            //     <Image
                            //         source={require('../assets/google.png')}
                            //         style={{ width: size, height: size, tintColor: '#D84B37' }}
                            //     />
                            // )} 
                            style={styles.buttonGoogle} labelStyle={styles.text} onPress={() => onGoogleButtonPress()}>
                                Continúa con Google
                            </Button>
                        )}

                    <View style={styles.row}>
                        <Text style={styles.label}>¿Aún no tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.link}>Registrate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            }
            {/* <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="¡UPSS!"
                message={messageAlert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={false}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    this.hideAlert();
                }}
                onConfirmPressed={() => {
                    this.hideAlert();
                }}
                titleStyle={{
                    fontSize: fp(3)
                }}
                messageStyle={{
                    fontSize: fp(2)
                }}
            /> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        marginTop: 3
    },
    link: {
        fontWeight: 'bold',
        color: 'black',

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
        fontWeight: 'bold'
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
        marginVertical: 10,
        backgroundColor: 'white',
        height: hp(8),
        borderColor: 'rgb(118, 118, 118);',
        borderWidth: 1,
    },
    textLogin: {
        fontSize: 15,
        lineHeight: hp(5.5),
        color: 'white'
    },
    text: {
        fontSize: 15,
        lineHeight: hp(5.5),
        color: 'rgb(118, 118, 118);'
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