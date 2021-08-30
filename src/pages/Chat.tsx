import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { TituloComunidade } from '../components/TituloComunidade';
import { months } from '../styles/info';
import { Message } from '../components/Message';
import { MyMessage } from '../components/MyMessage';

export function Chat({ route }: { route: any }) {
    const navigation = useNavigation();
    const idMes = route.params.idMes;

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
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>

            <TituloComunidade idMes={idMes} text={months[idMes][0]}/>

            <View style={styles.scrollView}>
            <ScrollView>
                <Message idMes={idMes}/>
                <MyMessage idMes={idMes}/>
            </ScrollView>
            </View>
            
            <View style={styles.sendView}>
                <TextInput style={styles.input} placeholder="Digite sua mensagem" />
                <TouchableOpacity onPress={handleSend} style={styles.buttonSend}>
                    <Feather name="send" style={styles.buttonIcon}/>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
}