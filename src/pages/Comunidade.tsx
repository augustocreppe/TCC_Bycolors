import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';

export function Comunidade() {
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

            <View style={styles.titleView}>
                <Text style={styles.title}>Página Comunidade</Text>
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
