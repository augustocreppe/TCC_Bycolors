import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { TituloComunidade } from '../components/TituloComunidade';
import { months } from '../styles/info';
import { Message } from '../components/Message';
import { MyMessage } from '../components/MyMessage';
import { constants } from '../config/app.config';
import { loadLogado } from '../libs/storage';

export function Chat({ route }: { route: any }) {
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const idMes = route.params.idMes;
    const [mensagens, setMensagens] = useState<any>();
    const [name, setName] = useState<any>();
    const [dadosUser, setDadosUser] = useState<any>();

    useEffect(() => {
        async function loadData() {
            await carregaMensagens();
            setDadosUser(await loadLogado());

            console.log("Dados:", mensagens);

            setReady(true);
        }

        loadData();
    },[]);

    async function carregaMensagens() {
        fetch(`${constants.API_URL}/mensagem/id_doenca=${idMes}`, {
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
            const data:any = [];

            json.map( (dado: any) => {
                fetch(`${constants.API_URL}/usuarios/id_usuario=${dado.user_id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                .then((response) => {
                    return response.json()
                })
                .then((user) => {
                    setMensagens([dado.user_id, user[0].nome_usuario, dado.conteudo_msg, dado.data]);
                })
                .catch((error) => {
                    Alert.alert('Erro ao carregar mensagens!', error);
                });
            });

            //console.log("ARRAY MEU:", data);
            //setMensagens(undefined);
        })
        .catch((error) => {
            Alert.alert('Erro ao carregar mensagens!', error);
        });
    }

    async function carregaNome() {
        mensagens.map(async (dado: any) =>
            fetch(`${constants.API_URL}/usuarios/id_usuario=${dado.user_id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                console.log("DADO: ", dado);
                console.log("NOME: ", user[0].nome_usuario);
                
                // <Message idMes={idMes} nome={user[0].nome_usuario} conteudo={dado.conteudo_msg} data={"10:30"}/>
            })
            .catch((error) => {
                Alert.alert('Erro ao carregar mensagens!', error);
            })
        )
    }

    function handleGoBack() {
        navigation.goBack();
    }

    function handleSend() {
        //Enviar mensagem
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
            backgroundColor: colors.background,
        },
        scrollView: {
            height: '75.5%',
        },
        buttonMenu: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            height: 56,
            width: 56,
        },
        sendView: {
            height: '8%',
            width: '100%',
            flexDirection: 'row',
        },
        input: {
            borderWidth: 1,
            borderRadius: 8,
            borderColor: colors.cinza_claro,
            backgroundColor: colors.branco,
            color: colors.heading,
            height: '80%',
            width: '87%',
            fontSize: 15,
            marginVertical: '1.5%',
            marginLeft: '1.5%',
            padding: 10,
            textAlign: 'justify',
        },
        buttonSend: {
            backgroundColor: cores[idMes][0],
            borderRadius: 20,
            width: 40,
            height: 40,
            marginLeft: 3,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: '2.5%',
        },
        buttonIcon: {
            fontSize: 25,
            alignSelf: 'center',
            color: cores[idMes][2],
        },
        buttonMenuIcon: {
            fontSize: 40,
            color: colors.body_dark,
        },
    });

    return (
        <>
            {
                (ready == true) &&

                <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                        <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                    </TouchableOpacity>

                    <TituloComunidade idMes={idMes} text={months[idMes][0]}/>

                    <View style={styles.scrollView}>
                    <ScrollView>

                        {/* {
                            mensagens.map(async (dado: any) =>
                                fetch(`${constants.API_URL}/usuarios/id_usuario=${dado.user_id}`, {
                                    method: 'GET',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                })
                                .then((response) => {
                                    return response.json()
                                })
                                .then((user) => {
                                    console.log("DADO: ", dado);
                                    console.log("NOME: ", user[0].nome_usuario);
                                    
                                    // <Message idMes={idMes} nome={user[0].nome_usuario} conteudo={dado.conteudo_msg} data={"10:30"}/>
                                })
                                .catch((error) => {
                                    Alert.alert('Erro ao carregar mensagens!', error);
                                })
                            )
                        } */}

                        {/* {
                            mensagens.map( (dado: any) => 
                                //console.log(dado)
                                <Text> { dado } </Text>
                                // <Message idMes={idMes} nome={dado[1]} conteudo={dado[2]} data={dado[3]}/>
                            )
                        } */}

                        <Message idMes={idMes} nome={"Augusto"} conteudo={"Exemplo de texto"} data={"10:30"}/>
                        <MyMessage idMes={idMes} conteudo={"Exemplo de texto"} data={"10:35"}/>
                    </ScrollView>
                    </View>
                    
                    <View style={styles.sendView}>
                        <TextInput style={styles.input} placeholder="Digite sua mensagem" />
                        <TouchableOpacity 
                            onPress={carregaNome} 
                            style={styles.buttonSend}>
                            <Feather name="send" style={styles.buttonIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </SafeAreaView>
            }
        </>
    );
}