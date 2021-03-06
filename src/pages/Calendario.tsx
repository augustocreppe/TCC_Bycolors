import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ButtonMes } from '../components/ButtonMes';
import { colors } from '../styles/colors';
import TabMenu from '../components/TabMenu';
import { isLogado } from '../libs/storage';

export function Calendario() {
    const navigation = useNavigation();
    const [isLogged, setIsLogged] = useState<any>();

    useEffect(() => {
        async function getData() {
            setIsLogged(await isLogado());
        }
        
        getData();
    },[]);


    function handleMenu() {
        navigation.navigate('MenuLateral');
    }

    function handleGoBack() {
        navigation.navigate('Inicio');
    }

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>

            {
                (isLogged == 'false') &&

                <>
                    <TouchableOpacity onPress={handleGoBack} style={styles.buttonMenu}>
                        <Feather name="arrow-left" style={styles.buttonMenuIcon}/>
                    </TouchableOpacity>
                </>
            }

            {
                (isLogged == 'true') &&

                <>
                    <TouchableOpacity onPress={handleMenu} style={styles.buttonMenu}>
                        <Feather name="menu" style={styles.buttonMenuIcon}/>
                    </TouchableOpacity>
                </>
            }

            <View style={styles.scrollView}>
            <ScrollView>
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
                <ButtonMes idMes={12}/>
            </ScrollView>
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
    scrollView: {
        height: 630,
    }
});
