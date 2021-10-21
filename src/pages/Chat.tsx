import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { TituloComunidade } from '../components/TituloComunidade';
import { months } from '../styles/info';
import { Message } from '../components/Message';
import { MyMessage } from '../components/MyMessage';
import { constants } from '../config/app.config';
import { loadLogado } from '../libs/storage';

export function Chat({ route }: { route: any }) {
    const idMes = route.params.idMes;
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const [mensagens, setMensagens] = useState<any>();
    const [dadosUser, setDadosUser] = useState<any>();
    const [conteudo, setConteudo] = useState<string>();
    const [conteudoIsFilled, setConteudoIsFilled] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        
        carregaMensagens().then(() => setRefreshing(false));
    },[]);

    useEffect(() => {
        async function loadData() {
            setDadosUser(await loadLogado());
            await carregaMensagens();

            setReady(true);
        }

        loadData();
    }, [ready]);

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
            setMensagens(json);
        })
        .catch((error) => {
            Alert.alert('Erro ao carregar mensagens!', error);
        })
    }

    function handleGoBack() {
        navigation.goBack();
    }

    function handleSend() {
        if(conteudoIsFilled)
        {
            const id_usuario = dadosUser[0];
            const id_doenca = idMes;
            const conteudo_msg = conteudo;

            const mensagem = { id_usuario, id_doenca, conteudo_msg }

            fetch(`${constants.API_URL}/mensagem`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mensagem)
            })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const novaMensagem = {
                    id_usuario,
                    conteudo_msg,
                    data: new Date()
                }

                setMensagens((mensagens: any) => [...mensagens, novaMensagem])
                setConteudo(undefined);
            })
            .catch((error) => {
                Alert.alert('Erro ao enviar mensagem!', error);
            });
        }
    }

    function handleConteudoChange(value: string) {
        setConteudoIsFilled(!!value);
        setConteudo(value);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
            backgroundColor: colors.background,
        },
        container2: {
            paddingTop: 20,
            height: 150,
            backgroundColor: colors.background,
        },
        scrollViewOut: {
            height: 650,
        },
        scrollView: {
            height: '90%',
        },
        buttonMenu: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            height: 56,
            width: 56,
        },
        sendView: {
            height: '10%',
            width: '100%',
            flexDirection: 'row',
        },
        input: {
            borderWidth: 1,
            borderRadius: 8,
            borderColor: colors.cinza_claro,
            backgroundColor: colors.branco,
            color: colors.heading,
            height: 'auto',
            width: '87%',
            fontSize: 15,
            marginVertical: '1.5%',
            marginLeft: '1.5%',
            padding: 10,
            paddingVertical: 0,
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
                    <View style={styles.container2}>
                        <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                            <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                        </TouchableOpacity>

                        <TituloComunidade idMes={idMes} text={months[idMes][0]}/>
                    </View>

                    <ScrollView scrollEnabled={false}>
                    <View style={styles.scrollViewOut}>
                        <View style={styles.scrollView}>
                        <ScrollView invertStickyHeaders={true} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/> }>
                            {
                                (mensagens != undefined) &&

                                mensagens.map((json: any) =>

                                    (dadosUser[0] == json.id_usuario) ? 
                                        <MyMessage idMes={idMes} conteudo={json.conteudo_msg} data={new Date(json.data).toLocaleTimeString()}/>
                                    :
                                        <Message idMes={idMes} nome={json.usuario.nome_usuario} conteudo={json.conteudo_msg} data={new Date(json.data).toLocaleTimeString()}/>
                                )
                            }
                        </ScrollView>
                        </View>
                        
                        <View style={styles.sendView}>
                            <TextInput style={styles.input} placeholder="Digite sua mensagem" multiline={true} numberOfLines={6} value={conteudo} onChangeText={handleConteudoChange}/>
                            <TouchableOpacity 
                                onPress={handleSend} 
                                style={styles.buttonSend}>
                                <Feather name="send" style={styles.buttonIcon}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </ScrollView>
                </SafeAreaView>
            }
        </>
    );
}