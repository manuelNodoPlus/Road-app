import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
// import Header from '../components/Header';
import { ActivityIndicator } from 'react-native-paper';
import TextInput from '../../components/Inputs/TextInput';
import LoadingButton from '../../components/Buttons/Loading';
import {
    emailValidator,
    passwordEmptyValidator,
    authError,
    showNotification,
} from '../../core/Utils/Utils';
//-----------------------------Google Signing-------------------------
import { GoogleSignin } from '@react-native-community/google-signin';
import Firebase from '../../core/Firebase/firebase';
import styles from './Authentication.style';
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
        setLoadingButtonGoogle(loadingButtonGoogle ? false : true);
        try {
            // Get the users ID token
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
                showNotification(authError(error.code), 'default');
            });
        } catch (e) {
            console.log('Error login with Google: ', e)
            setLoadingButtonGoogle(false);
            showNotification('Lo sentimos ocurrió un error, intentalo más tarde', 'default');
        }
    }

    //-------------------------------Phone number---------------------------------------------------
    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');
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
                        showNotification('Por favor, verifica tu correo primero', 'default');
                    }
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                    showNotification(authError(error.code), 'default');
                });
                // setShowLoading(false);


            }
        } catch (e) {
            setLoading(false);
            showNotification('Lo sentimos ocurrió un error, intentalo más tarde', 'default');
        }
    };

    const buttonGoogleContent = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../../assets/google.png')}
                    style={{ width: 30, height: 30, tintColor: '#D84B37', marginHorizontal: 10 }}
                />
                <Text
                    style={[styles.text, { textTransform: 'uppercase' }]}
                >
                    Continúa con Google
            </Text>
            </View>
        )
    }

    const buttonLoginContent = () => {
        return (
            <Text
                style={[styles.textLogin, { textTransform: 'uppercase' }]}
            >
                Iniciar sesión
            </Text>
        )
    }
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
                    <LoadingButton
                        buttonStyle={styles.buttonLogin}
                        content={buttonLoginContent}
                        onPress={login}
                        loading={loading}
                    />

                    <Text style={styles.or2}>Ó</Text>
                    <LoadingButton
                        buttonStyle={styles.buttonGoogle}
                        content={buttonGoogleContent}
                        onPress={onGoogleButtonPress}
                        loading={loadingButtonGoogle}
                    />
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
        </ScrollView>
    );
}
