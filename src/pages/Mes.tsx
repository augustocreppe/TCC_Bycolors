import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Titulo } from '../components/Titulo';
import { Feather } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { Accordion } from '../components/Accordion';

export function Mes({ route }: { route: any }) {
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    const idMes = route.params.idMes;
    
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
            </TouchableOpacity>

            <ScrollView>
            <View style={styles.contentView}>
                <Titulo idMes={idMes}/>
                <Accordion idMes={idMes}/>
            </View>
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
    contentView: {
        height: '100%',
        marginBottom: 20
    }
});