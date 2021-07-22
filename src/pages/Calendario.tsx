import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ButtonMes } from '../components/ButtonMes';
import { colors } from '../styles/colors';

export function Calendario() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.navigate('MenuLateral');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="menu" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>

            <ScrollView>
                <ButtonMes idMes={0}/>
                <ButtonMes idMes={1}/>
                <ButtonMes idMes={2}/>
                <ButtonMes idMes={3}/>
                <ButtonMes idMes={4}/>
                <ButtonMes idMes={5}/>
                <ButtonMes idMes={6}/>
                <ButtonMes idMes={7}/>
                <ButtonMes idMes={8}/>
                <ButtonMes idMes={9}/>
                <ButtonMes idMes={10}/>
                <ButtonMes idMes={11}/>
            </ScrollView>

        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    buttonMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginLeft: 15,
        height: 56,
        width: 56,
    },
    buttonMenuIcon: {
        fontSize: 40,
        color: colors.body_dark,
    },
    titleView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
