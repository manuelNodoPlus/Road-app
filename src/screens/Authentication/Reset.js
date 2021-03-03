import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
// import Header from '../components/Header';
import { ActivityIndicator } from 'react-native-paper';
import TextInput from '../../components/Inputs/TextInput';
import LoadingButton from '../../components/Buttons/Loading';
import {
    emailValidator,
    authError,
    showNotification,
} from '../../core/Utils/Utils';
//-----------------------------Google Signing-------------------------
import Firebase from '../../core/Firebase/firebase';
import styles from './Authentication.style';

export default function Reset({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [showLoading, setShowLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const reset = async() => {
        setLoading(true);
        try {
            const emailError = emailValidator(email.value);
            if (emailError) {
                // setName({ ...name, error: nameError });
                setEmail({ ...email, error: emailError });
                setShowLoading(false);
                return;
            }else{ 
                
            
                    await Firebase.auth.sendPasswordResetEmail(email.value).then(() => {
                        setLoading(false);
                        showNotification('Enviamos un correo de restauración a tu correo', '¡Bien!');
                        navigation.navigate('Login');
                    }).catch((error) => {
                        setLoading(false);
                        showNotification(authError(error.code), '¡UPS!');
                    });
                    setShowLoading(false);
            }
        } catch (e) {
            setShowLoading(false);
            showNotification('Lo sentimos ocurrió un error, intentalo más tarde', '¡UPS!');
        }
    };
    const buttonResetContent = () => {
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
            <View style={{backgroundColor: 'white', height: 700}}>
            
                <StatusBar backgroundColor='white' barStyle="dark-content" />
                <View style={{marginLeft: 30, marginRight: 30}}>
                    {/* <Logo /> */}
                    {/* <Image
                        source={require('../../assets/logo.png')}
                        style={{ width: '100%', height: hp(19),
                        marginTop: 40,
                        alignSelf: "center", alignSelf: 'center'}}
                        resizeMode="center"
                    />
                    <Header >Restablecer contraseña</Header> */}
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
                    <LoadingButton
                        buttonStyle={styles.buttonLogin}
                        content={buttonResetContent}
                        onPress={reset}
                        loading={loading}
                    />
                    <View style={styles.row}>
                        <Text style={styles.label}>¿Aún no tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.link}>Registrate</Text>
                        </TouchableOpacity>
                    </View>
                    {showLoading &&
                        <View style={styles.activity}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    }
                </View>            
            </View>
        </ScrollView>
    );
}