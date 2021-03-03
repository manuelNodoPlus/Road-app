import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
// import Header from '../components/Header';
import TextInput from '../../components/Inputs/TextInput';
import LoadingButton from '../../components/Buttons/Loading';
import {
    emailValidator,
    authError,
    showNotification,
} from '../../core/Utils/Utils';
//-----------------------------Google Signing-------------------------
import { GoogleSignin } from '@react-native-community/google-signin';
import Firebase from '../../core/Firebase/firebase';
import styles from './Authentication.style';
export default function Register({ navigation }) {
    const [name, setName] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setconfirmPassword] = useState({ value: '', error: '' });
    const [showLoading, setShowLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingButtonGoogle, setLoadingButtonGoogle] = useState(false);
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    const register = async () => {
        setLoading(true);
        try {
            const nameError = nameValidator(name.value);
            const emailError = emailValidator(email.value);
            const passwordError = passwordValidator(password.value);
            const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);
            if (emailError || passwordError || confirmPasswordError) {
                // setName({ ...name, error: nameError });
                setEmail({ ...email, error: emailError });
                setPassword({ ...password, error: passwordError });
                setconfirmPassword({ ...confirmPassword, error: confirmPasswordError });
                setLoading(false);
                return;
            } else {

                setShowLoading(true);
                Firebase.auth.createUserWithEmailAndPassword(email.value, password.value).then(() => {
                    Firebase.db.ref(`/users/${Firebase.auth.currentUser.uid}`).set({
                        uid: Firebase.currentUser.uid,
                        email: Firebase.currentUser.email,
                        emailVerified: Firebase.currentUser.emailVerified,
                        providerData: Firebase.auth.providerData,
                        createdAt: Firebase.serverValue.TIMESTAMP
                    }).catch((error) => {
                        setLoading(false);
                        showNotification('Lo sentimos ocurrió un error, intentalo más tarde','default');
                    });
                    Firebase.currentUser.sendEmailVerification();
                }).catch((error) => {
                    console.log(error.code)
                    setLoading(false);
                    showNotification(authError(error.code), 'default');
                });
                if (Firebase.currentUser !== null && !Firebase.currentUser.emailVerified) {
                    Firebase.signOut();
                    showNotification('Ahora verifica tu correo', 'default');

                    await sleep(3000);
                    navigation.navigate('Login')
                }
                setLoading(false);
                
            }
        } catch (e) {
            console.log(e)
            setLoading(false);
            showNotification('Lo sentimos ocurrió un error, intentalo más tarde', 'default');
        }
    };
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

    const buttonRegisterContent = () => {
        return (
            <Text
                style={[styles.textLogin, { textTransform: 'uppercase' }]}
            >
                Registrarse
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
                        source={require('../../assets/logo.png')}
                        style={{
                            width: '100%', height: hp(19),
                            marginTop: 40,
                            alignSelf: "center", alignSelf: 'center'
                        }}
                        resizeMode="center"
                    />
                    <Header >Registrate en TibaPlus</Header> */}
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
                    <TextInput
                        label="Confirmar contraseña"
                        returnKeyType="done"
                        value={confirmPassword.value}
                        onChangeText={text => setconfirmPassword({ value: text, error: '' })}
                        error={!!confirmPassword.error}
                        errorText={confirmPassword.error}
                        secureTextEntry
                    />
                    <LoadingButton
                        buttonStyle={styles.buttonLogin}
                        content={buttonRegisterContent}
                        onPress={register}
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
                        <Text style={styles.label}>¿Ya eres un usuario? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.link}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
}

