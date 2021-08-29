import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import fonts from '../styles/fonts';
import { cores, colors } from '../styles/colors';
import { months } from '../styles/info';

interface ButtonProps extends TouchableOpacityProps {
    idMes: number;
}

export function ButtonGrupos ({ idMes, ...rest }: ButtonProps) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: cores[idMes][0],
            height: 100,
            width: '88%',
            borderRadius: 16,
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 1.5,
            borderColor: cores[idMes][1],
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 20,
        },
        text: {
            fontSize: 22,
            color: colors.preto, 
            fontFamily: fonts.heading,
            marginBottom: 5,
        },
        subtext:
        {
            fontSize: 16,
            color: colors.preto,
            fontFamily: fonts.heading,
        },
        subcont:
        {
            backgroundColor: cores[idMes][0],
            height: '100%',
            width: '95%',
            borderTopEndRadius: 16,
            borderBottomEndRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1.5,
            borderLeftColor: cores[idMes][0],
            flexDirection: 'row',
        },
        viewText: {
            width: 220
        },
        usersIcon:
        {
            fontSize: 60,
            marginLeft: 20,
            color: cores[idMes][2]
        },
    });

    const navigation = useNavigation();

    function handleGrupos() {
        navigation.navigate('Grupo', {idMes: idMes});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.subcont} onPress={handleGrupos}>
                <View style={styles.viewText}>
                    <Text style={styles.text}>
                        { months[idMes][0] }
                    </Text>
                    <Text style={styles.subtext}>
                        { months[idMes][1] }
                    </Text>
                </View>
                <View>
                    <FontAwesome5 name="users" style={styles.usersIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
};

