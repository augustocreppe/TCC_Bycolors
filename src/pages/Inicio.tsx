import React, { useState } from 'react';
import { 
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Touchable,
    Keyboard,
    Alert,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';

import { colors } from '../styles/colors';
import fonts from '../styles/fonts';

const fundo = require('../assets/fundo.jpg');
const logo = require('../assets/logo.png');
const marca = require('../assets/marca.png');

export function Inicio() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [email, setEmail] = useState<string>();

    const navigation = useNavigation();

    function handleEnter() {
        navigation.navigate('Calendario');
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!email);
    }
    function handleInputFocus(){
        setIsFocused(true);
    }
    function handleInputChange(value: string){
        setIsFilled(!!value);
        setEmail(value);
    }

    async function handleSubmit(){
        if(!email)
            return Alert.alert('Por favor, digite seu e-mail.');

        try{
            await AsyncStorage.setItem('@TCC_Bycolors:user', email);
            navigation.navigate('Calendario');
        }catch{
            Alert.alert('Não foi possível salvar o seu e-mail.')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <ImageBackground 
                    source={fundo} 
                    style={styles.fundo}
                    resizeMode="cover"
                >
                    <View style={styles.viewLogo}>
                        <View style={styles.sizeLogo}>
                            <Image source={logo} style={styles.logo} resizeMode="cover"/>
                        </View>
                    </View>

                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.content}>
                                <View style={styles.sizeMarca}>
                                    <Image source={marca}  resizeMode="cover"/>
                                </View>
                                        <Text style={styles.text}>
                                            <Entypo
                                                name="email"
                                                style={styles.emailIcon}
                                            />
                                            {' '}E-mail:
                                        </Text>
                                        
                                        <TextInput
                                            style={[
                                                styles.input, 
                                                (isFocused || isFilled) &&
                                                { borderColor: colors.azul_escuro }
                                            ]}
                                            placeholder="Ex: joao@gmail.com"
                                            
                                            onBlur={handleInputBlur}
                                            onFocus={handleInputFocus}
                                            onChangeText={handleInputChange}
                                        />

                                        <Text style={styles.text}>
                                        <FontAwesome
                                                name="lock"
                                                style={styles.passwordIcon}
                                            />
                                            {' '}Senha:
                                        </Text>

                                        <TextInput
                                            style={[
                                                styles.input, 
                                                (isFocused || isFilled) &&
                                                { borderColor: colors.azul_escuro }
                                            ]}
                                            onBlur={handleInputBlur}
                                            onFocus={handleInputFocus}
                                            onChangeText={handleInputChange}
                                        />

                                        <Text style={styles.complement}>
                                            Esqueci minha senha
                                        </Text>

                                    <View style={styles.buttonEntrarView}>
                                        <TouchableOpacity onPress={handleEnter} style={styles.buttonEntrar}>
                                            <Feather name="log-in" style={styles.buttonEntrarIcon}/>
                                            <Text style={styles.buttonEntrarText}>Entrar</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </KeyboardAvoidingView>

            
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fundo: {
        flex: 1,
    },
    viewLogo: {
        width: 180,
        height: 180,
        backgroundColor: colors.branco,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: colors.cinza_claro,
        paddingTop: '2.5%',
        marginTop: '15%',
    },
    sizeLogo: {
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 137,
    },
    sizeMarca: {
        alignItems: 'center',
        marginTop: 30
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonEntrarView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    buttonEntrar: {
        flexDirection: 'row',
        backgroundColor: colors.cinza_claro,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 65,
        width: 300
    },
    buttonEntrarIcon: {
        fontSize: 30,
        color: colors.body_dark,
        marginRight: 10
    },
    buttonEntrarText: {
        fontSize: 25,
    },
    content: {
        margin: 30,
        flex: 1,
        borderColor: colors.branco,
        borderRadius: 20,
        backgroundColor: colors.branco,
    },
    text: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginHorizontal: 25,
        marginTop: 25
    },
    input: {
        borderWidth: 1,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        width: '86%',
        fontSize: 18,
        marginTop: 10,
        marginHorizontal: 25,
        padding: 10,
        textAlign: 'justify',
    },
    complement: {
        fontFamily: fonts.heading,
        fontSize: 12,
        marginLeft: 220,
        marginTop: 5,
    },
    emailIcon: {
        fontSize: 18,
    },
    passwordIcon: {
        fontSize: 18,
    },
});
