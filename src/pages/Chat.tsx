import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';
import TabMenu from '../components/TabMenu';

export function Chat() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    function handleSend() {

    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>

        <View style={styles.doubleView}>
            <TextInput
                style={styles.input}
                placeholder="Digite sua mensagem"   
            />

            <TouchableOpacity onPress={handleSend} style={styles.buttonSend}>
                <Feather name="send" style={styles.buttonIcon}/>
            </TouchableOpacity>
        </View>

            <TabMenu/>
         
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.cinza_claro
    },

    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15,
        height: 56,
        width: 56,
    },

    doubleView: {
        flexDirection: 'row'
    },

    input: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: colors.cinza_claro,
        backgroundColor: colors.branco,
        color: colors.heading,
        height: '6%',
        width: '86%',
        fontSize: 15,
        marginTop: 602,
        marginHorizontal: 2,
        padding: 10,
        textAlign: 'justify',
    },

    buttonSend: {
        marginTop: 602,
        backgroundColor: colors.rosa_claro,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonIcon: {
        fontSize: 25,
        alignSelf: 'center',
        color: colors.rosa
    },

    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
});
