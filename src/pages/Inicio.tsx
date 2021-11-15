import React, { useEffect, useState } from 'react';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, Platform, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { constants } from '../config/app.config';
import { isLogado, logoutLogado, saveLogado } from '../libs/storage';

const fundo = require('../assets/fundo.png');
const logo = require('../assets/logo.png');
const marca = require('../assets/marca.png');

export function Inicio() {
    const [emailIsFocused, setEmailIsFocused] = useState(false);
    const [emailIsFilled, setEmailIsFilled] = useState(false);
    const [passwordIsFocused, setPasswordIsFocused] = useState(false);
    const [passwordIsFilled, setPasswordIsFilled] = useState(false);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [existeEmail, setExisteEmail] = useState(false);
    const [senhaCerta, setSenhaCerta] = useState<string>();
    const [data, setData] = useState<any>();
    const [isLogged, setIsLogged] = useState<any>();
    const navigation = useNavigation();

    function handleContinue() {
        if(!email)
            return Alert.alert('Por favor, digite seu e-mail.');
        else if(!email.includes('@'))
            return Alert.alert('Por favor, digite um e-mail válido.');

        setPassword(undefined);
        setSenhaCerta(undefined);

        fetch(`${constants.API_URL}/usuarios/email=${email}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            if(json.length != 0)
            {
                if(json[0].excluido == false) {
                    setExisteEmail(true);
                    salvaAsync(json);
                }
                else
                    Alert.alert('Email inexistente!');
            }
            else
            {
                Alert.alert('Email inexistente!');
            }
        })
        .catch((error) => {
            Alert.alert('Erro ao encontrar email!', error);
        });
    }

    async function salvaAsync(dados: any) {
        try {
            setData([
                dados[0].id_usuario, 
                dados[0].nome_usuario, 
                dados[0].telefone, 
                dados[0].email, 
                dados[0].senha,
                dados[0].cidade,
                dados[0].estado,
                dados[0].avatar,
                dados[0].bio
            ]);

            setSenhaCerta(dados[0].senha);
        } 
        catch {
            setExisteEmail(false);
            return Alert.alert('Erro ao encontrar email!');
        }
    }

    async function handleVoltar() {
        setExisteEmail(false);
        setEmail(undefined);
        setPassword(undefined);
        setData(null);
        await AsyncStorage.setItem('@TCC_Bycolors:isLogged', ""+false);
        await logoutLogado();
    }

    async function handleSubmit() {
        if(!password)
            return Alert.alert('Por favor, digite sua senha.');

        try {
            if(password == senhaCerta) {
                setEmail(undefined);
                setPassword(undefined);
                setSenhaCerta(undefined);
                setExisteEmail(false);
                await saveLogado(
                    data[0],
                    data[1],
                    data[2],
                    data[3],
                    data[4],
                    data[5],
                    data[6],
                    data[7],
                    data[8],
                );
                navigation.navigate('Calendario');
            }
            else {
                Alert.alert('Senha incorreta!');
            }
        }
        catch {
            Alert.alert('Não foi possível logar!');
        }
    }

    function handleRegister() {
        navigation.navigate('CadastroUsuario');
    }

    async function handleEnter() {
        await AsyncStorage.setItem('@TCC_Bycolors:isLogged', ""+false);
        navigation.navigate('Calendario');
    }

    function handleEmailBlur() {
        setEmailIsFocused(false);
        setEmailIsFilled(!!email);
    }

    function handleEmailFocus() {
        setEmailIsFocused(true);
    }

    function handleEmailChange(value: string) {
        setEmailIsFilled(!!value);
        setEmail(value);
    }

    function handlePasswordBlur() {
        setPasswordIsFocused(false);
        setPasswordIsFilled(!!password);
    }

    function handlePasswordFocus() {
        setPasswordIsFocused(true);
    }

    function handlePasswordChange(value: string) {
        setPasswordIsFilled(!!value);
        setPassword(value);
    }

    async function handleForgotPassword() {
        Alert.alert(
            "Redefinir Senha",
            "Você deseja realmente redefinir sua senha?",
            [
              {
                text: "Sim",
                onPress: () => {
                    const nome = data[1];
                    const senha = Math.floor(Math.random() * (99999999 - 11111111));

                    const publi = { email, nome, senha}

                    fetch(`${constants.API_URL}/mail/password`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(publi)
                    })
                    .then((response) => {
                        return response.json();
                    })
                    .then(async (json) => {
                        Alert.alert(`Senha redefinida com sucesso! Cheque seu email para vê-la.`);
                        await alterarSenha(senha);
                    })
                    .catch((error) => {
                        Alert.alert('Erro ao redefinir senha!', error);
                    });
                },
              },
              {
                text: "Não",
              },
            ]
        );
    }

    async function alterarSenha(senha:any) {
        const nome_usuario = data[1];
        const telefone = data[2];
        const email = data[3];
        const cidade = data[5];
        const estado = data[6];
        const avatar = data[7];
        const bio = data[8];

        const user = { nome_usuario, email, telefone, cidade, estado, bio, avatar, senha }
        
        fetch(`${constants.API_URL}/usuarios/${data[0]}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(async (json) => {
            setExisteEmail(false);
            setEmail(undefined);
            setPassword(undefined);
            setData(null);
            await AsyncStorage.setItem('@TCC_Bycolors:isLogged', ""+false);
            await logoutLogado();
        })
        .catch((error) => {
            Alert.alert('Erro ao redefinir senha!', error);
        });
    }

    useEffect(() => {
        async function setLogged() {
            setIsLogged(await isLogado());

            if(isLogged == 'true')
                navigation.navigate('Calendario');
        }
        
        setLogged();
    },[isLogged]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView>
        <ImageBackground source={fundo} style={styles.fundo} resizeMode="cover">
            <View style={styles.container}>

                <View style={styles.viewLogo}>
                    <View style={styles.sizeLogo}>
                    <Image source={logo} style={styles.logo} resizeMode="cover"/>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.content}>

                        <View style={styles.sizeMarca}>
                            <Image source={marca}  resizeMode="cover" style={styles.imageMarca}/>
                        </View>

                        {
                            (!existeEmail) &&

                            <>
                                <Text style={styles.text}>
                                    <Entypo name="mail" style={styles.icon}/>
                                    {' '}E-mail
                                </Text>
                                            
                                <TextInput
                                    style={styles.input1}
                                    placeholder="Ex: joao@gmail.com"
                                    
                                    onBlur={handleEmailBlur}
                                    onFocus={handleEmailFocus}
                                    onChangeText={handleEmailChange}
                                />

                                <TouchableOpacity onPress={handleContinue} style={styles.buttonA}>     
                                    <Feather name="arrow-right" style={styles.buttonIcon}/>
                                    <Text style={styles.buttonText}>Seguir</Text>
                                </TouchableOpacity>
                            </>
                        }
                        
                        {
                            (existeEmail) &&

                            <> 
                                <Text style={styles.text}>
                                    <FontAwesome name="lock" style={styles.icon} />
                                    {' '}Senha
                                </Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••"
                                    secureTextEntry={true}

                                    onBlur={handlePasswordBlur}
                                    onFocus={handlePasswordFocus}
                                    onChangeText={handlePasswordChange}
                                />

                                <View style={styles.warningsView}>
                                <TouchableOpacity onPress={handleVoltar}>
                                    <Text style={styles.complement1}>
                                        Voltar
                                    </Text>
                                </TouchableOpacity>       

                                <TouchableOpacity onPress={handleForgotPassword}>
                                    <Text style={styles.complement2}>
                                        Esqueci minha senha
                                    </Text>
                                </TouchableOpacity>
                                </View>

                                <TouchableOpacity onPress={handleSubmit} style={styles.buttonB}>
                                    <Feather name="log-in" style={styles.buttonIcon}/>
                                    <Text style={styles.buttonText}>Entrar</Text>
                                </TouchableOpacity>
                            </>
                        }

                        <View style = {styles.textLine}/>

                        <TouchableOpacity onPress={handleRegister} style={styles.button2}>
                            <Feather name="user-plus" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Cadastrar-se</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleEnter} style={styles.button3}>
                            <Feather name="user-x" style={styles.buttonIcon}/>
                            <Text style={styles.buttonText}>Entrar sem logar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                
            </View>
        </ImageBackground>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
    fundo: {
        flex: 1,
        height: '100%',
    },
    viewLogo: {
        width: 160,
        height: 160,
        backgroundColor: colors.branco,
        borderRadius: 100,
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 4,
        borderColor: colors.branco,
        paddingTop: '3%',
        marginTop: '15%',
        marginBottom: '1%',
    },
    sizeLogo: {
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 114,
    },
    sizeMarca: {
        alignItems: 'center',
        marginTop: '5%',
        marginBottom: '1%',
    },
    imageMarca: {
        height: 101,
        width: 300,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: '9%',
        width: '86%',
        fontSize: 18,
        marginTop: 5,
        marginHorizontal: 25,
        padding: 10,
        textAlign: 'justify',
        marginBottom: '4%',
    },
    input1: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        color: colors.heading,
        height: '9%',
        width: '86%',
        fontSize: 18,
        marginTop: 5,
        marginHorizontal: 25,
        padding: 10,
        textAlign: 'justify',
        marginBottom: '7%',
    },
    complement1: {
        fontFamily: fonts.heading,
        color: colors.preto,
        fontSize: 15,
        marginLeft: 27,
        marginTop: -10,
    },
    complement2: {
        fontFamily: fonts.heading,
        color: colors.preto,
        fontSize: 15,
        marginLeft: 105,
        marginBottom: '1%',
        marginTop: -10,
    },
    content: {
        margin: 30,
        flex: 1,
        borderColor: colors.branco,
        borderRadius: 20,
        backgroundColor: colors.branco,
        marginBottom: 35,
    },
    text: {
        fontFamily: fonts.heading,
        fontSize: 20,
        marginHorizontal: 25,
        marginTop: '5%',
        color: colors.preto
    },
    icon: {
        fontSize: 18,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonA: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 29,
        marginBottom: 10,
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    buttonB: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 25,
        marginBottom: 10,
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    button2: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
        marginBottom: '5%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    button3: {
        flexDirection: 'row',
        backgroundColor: colors.body_dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 5,
        marginBottom: '6%',
        marginHorizontal: '7%',
        height: 50,
        width: '86%',
    },
    buttonIcon: {
        fontSize: 20,
        color: colors.branco,
        marginRight: 10
    },
    buttonText: {
        fontSize: 20,
        color: colors.branco,
        fontFamily: fonts.heading
    },
    textLine: {
        borderBottomColor: colors.preto,
        borderBottomWidth: 2,
        width: '86%',
        alignSelf: 'center',
        marginVertical: '6%',
    },
    warningsView: {
        flexDirection: 'row',
    }
});