import React from 'react';
import { StyleSheet, Text, View, TouchableOpacityProps } from 'react-native';
import { cores } from '../styles/colors';
import fonts from '../styles/fonts';

interface PostProps extends TouchableOpacityProps {
    idMes: number;
    conteudo: string;
    data: string;
}

export function MyMessage ({ idMes, conteudo, data, ...rest }: PostProps) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: cores[idMes][1],
            width: '75%',
            marginRight: '6%',
            alignSelf: 'flex-end',
            height: 'auto',
            marginTop: 15,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
        },
        infoView: {
            flexDirection: 'row',
            height: 30,
            backgroundColor: cores[idMes][2],
            borderTopLeftRadius: 10,
        },
        nameView: {
            width: '84%',
            flexDirection: 'row',
        },
        name: {
            fontFamily: fonts.heading,
            fontSize: 20,
            marginLeft: '2%',
            textAlignVertical: 'center',
        },
        timeView: {
            width: '16%',
            flexDirection: 'row',
        },
        time: {
            fontFamily: fonts.text,
            fontSize: 18,
            textAlignVertical: 'center',
        },
        textView: {
            margin: '2%',
        },
        text: {
            fontFamily: fonts.text,
            fontSize: 16,
            textAlignVertical: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.infoView}>
                <View style={styles.nameView}>
                    <Text style={styles.name}>Você</Text>
                </View>
                <View style={styles.timeView}>
                    <Text style={styles.time}>{data}</Text>
                </View>
            </View>
            <View style={styles.textView}>
                <Text style={styles.text}>{conteudo}</Text>
            </View>
        </View>
    )
};