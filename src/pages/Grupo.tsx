import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Feather } from '@expo/vector-icons';

export function Grupo() {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>
            <Text>
                Tela Grupo
            </Text>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
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
});
