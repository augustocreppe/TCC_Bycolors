import React from 'react';
import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { cores } from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    idMes: number;
}

export function Titulo ({ idMes, ...rest }: ButtonProps) {
    const styles = StyleSheet.create({
        container: {
            height: 100,
            width: '90%',
            borderRadius: 16,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'center',
            marginBottom: -20,
        },
        subcont:
        {
            backgroundColor: cores[idMes][0],
            width: '100%',
            height: 100,
            borderTopEndRadius: 16,
            borderTopStartRadius: 16,
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1.5,
            borderColor: cores[idMes][2],
        },
        textView: {
            flex: 1,
            alignItems: 'center',
            alignContent: 'center',
            marginRight: 20,
        },
        text: {
            fontSize: 28,
            color: cores[idMes][2],
            fontFamily: fonts.heading,
            marginBottom: 5,
        },
        subtext:
        {
            fontSize: 24,
            color: cores[idMes][2],
            fontFamily: fonts.heading,
        },
        ribbonView: {
            marginHorizontal: 20,
        },
        ribbonIcon:
        {
            fontSize: 60,
            color: cores[idMes][1]
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.subcont}>
                <View style={styles.ribbonView}>
                    <FontAwesome5 name="ribbon" style={styles.ribbonIcon}/>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        Doença
                    </Text>
                    <Text style={styles.subtext}>
                        Mês Cor
                    </Text>
                </View>
            </View>
        </View>
    )
};