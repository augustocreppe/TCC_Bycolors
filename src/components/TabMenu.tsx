import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors, cores } from '../styles/colors';
import fonts from '../styles/fonts';

export default function TabMenu () {
    const navigation = useNavigation();

    function handleCalendario () {
        navigation.navigate('Calendario');
    }

    function handleComunidade () {
        navigation.navigate('Comunidade');
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.body_dark,
            height:80,
            flexDirection: 'row',
        },
        button: {
            width: '50%',
            height: '100%',
            alignItems: 'center',
            marginTop: 15,
        },
        icon1: {
            fontSize: 25,
            color: cores[0][0]
        },
        text1: {
            fontFamily: fonts.text,
            fontSize: 15,
            color: cores[0][0]
        },
        icon2: {
            fontSize: 25,
            color: cores[0][0]
        },
        text2: {
            fontFamily: fonts.text,
            fontSize: 15,
            color: cores[0][0]
        }
    });

    return(
        <View style={styles.container} >
            <TouchableOpacity style={styles.button} onPress={handleCalendario} >
                <Feather name="calendar" style={styles.icon1}/>
                <Text style={styles.text1}> Calendário </Text>
            </TouchableOpacity>
                        
            <TouchableOpacity style={styles.button} onPress={handleComunidade} >
                <Feather name="users" style={styles.icon2}/>
                <Text style={styles.text2}> Comunidade </Text>
            </TouchableOpacity>
        </View>
    )
}