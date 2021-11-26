import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, ScrollView, TextInput, Alert, RefreshControl, FlatList } from 'react-native';
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
    let listRef: any;
    const idMes = route.params.idMes;
    const navigation = useNavigation();
    const [ready, setReady] = useState(false);
    const [mensagens, setMensagens] = useState<any>();
    const [dadosUser, setDadosUser] = useState<any>();
    const [conteudo, setConteudo] = useState<string>();
    const [conteudoIsFilled, setConteudoIsFilled] = useState(false);
    const [conteudoIsFocused, setConteudoIsFocused] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [canSend, setCanSend] = useState(false);

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

    useEffect(() => {
        handleForceScroll();
    }, [conteudoIsFocused]);

    useEffect(() => {
        handleForceScroll();
    }, [conteudo]);

    const renderItem = (listItem: any) => {
        if (dadosUser[0] == listItem.item.id_usuario) {
            return <MyMessage 
                idMes={idMes} 
                conteudo={listItem.item.conteudo_msg} 
                data={new Date(listItem.item.data).toLocaleTimeString()}
            />
        } else {
            return <Message 
                idMes={idMes} 
                nome={listItem.item.usuario.nome_usuario} 
                conteudo={listItem.item.conteudo_msg} 
                data={new Date(listItem.item.data).toLocaleTimeString()}
            />
        }
    }

    function handleForceScroll() {
        if(listRef != undefined)
            listRef.scrollToOffset({
                offset: 1000000,
                animated: true,
            });
    }

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
        setCanSend(false);
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

                setMensagens((mensagens: any) => [...mensagens, novaMensagem]);
                setConteudo(undefined);
                handleForceScroll();
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

    function handleConteudoFocus() {
        setConteudoIsFocused(true);
    }

    function handleConteudoBlur() {
        setConteudoIsFocused(false);
        if(conteudo != undefined)
        {
            if(conteudo.match(/[^ ]/gm) != null)
                setCanSend(true);
            else
                setCanSend(false);
        }
        handleForceScroll();
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
        container3: {
            flexDirection: 'row',
        },
        scrollViewOut: {
            height: 750,
        },
        scrollView: {
            marginTop: -15,
            marginBottom: 5,
            paddingTop: 10,
        },
        buttonMenu: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 15,
            height: 56,
            width: 56,
        },
        buttonMenu2: {
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 270,
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
            marginVertical: 18,
        },
        buttonIcon: {
            fontSize: 25,
            alignSelf: 'center',
            color: cores[idMes][2],
        },
        buttonMenuIcon: {
            fontSize: 40,
            color: colors.body_dark,
        }
    });

    return (
        <>
            {
                (ready == true) &&

                <SafeAreaView style={styles.container}>
                    <View style={styles.container2}>
                        <View style={styles.container3}>
                            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleForceScroll} style={styles.buttonMenu2}>
                                <Feather name="chevron-down" style={styles.buttonMenuIcon}/>
                            </TouchableOpacity>
                        </View>

                        <TituloComunidade idMes={idMes} text={months[idMes][0]}/>
                    </View>

                    <ScrollView scrollEnabled={false}>
                    <View style={styles.scrollViewOut}>

                        <View style={[
                            styles.scrollView,

                            (conteudoIsFocused) &&
                            { height: 305 },

                            (!conteudoIsFocused) &&
                            { height: 585 },
                        ]}>
                        { (mensagens != undefined) &&
                            <FlatList 
                                data={mensagens} 
                                renderItem={renderItem} 
                                keyExtractor={item => item.id}
                                ref = {(ref) => {
                                    listRef = ref;
                                }}
                                style={styles.scrollView}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                                contentContainerStyle={{ paddingBottom: 10 }}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                        </View>
                        
                        <View style={styles.sendView}>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Digite sua mensagem" 
                                multiline={true} 
                                numberOfLines={3}
                                value={conteudo} 
                                onChangeText={handleConteudoChange} 
                                onFocus={handleConteudoFocus} 
                                onBlur={handleConteudoBlur}/>
                            <TouchableOpacity
                                onPress={handleSend}
                                style={styles.buttonSend}
                                disabled={!canSend}>
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