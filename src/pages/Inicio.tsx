import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colors from '../styles/colors';

export function Inicio() {
    const navigation = useNavigation();

    function handleEnter() {
        navigation.navigate('Calendario');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.space}/>

            <View style={styles.titleView}>
                <Text style={styles.title}>App - Bycolors</Text>
            </View>

            <View style={styles.titleView}>
                <Text style={styles.title}>Página Início</Text>
            </View>

            <View style={styles.buttonEntrarView}>
            <TouchableOpacity onPress={handleEnter} style={styles.buttonEntrar}>
                <Feather name="log-in" style={styles.buttonEntrarIcon}/>
                <Text style={styles.buttonEntrarText}>Entrar</Text>
            </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    space: {
        marginTop: 250
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
        marginTop: 30
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
});
