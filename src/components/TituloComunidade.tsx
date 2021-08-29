import React from 'react';
import { StyleSheet, Text, View, TouchableOpacityProps } from 'react-native';
import { cores } from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    idMes: number;
    text: string;
}

export function TituloComunidade({ idMes, text, ...rest }: ButtonProps){
    const styles=StyleSheet.create({
        container:{
            width: '88%',
            height: 40,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: cores[idMes][2],
            marginVertical: '4%',
        },
        text:{
            fontSize: 20,
            color: cores[idMes][0],
            fontFamily: fonts.heading,
        },
    });

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

