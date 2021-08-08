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

export function ButtonMes ({ idMes, ...rest }: ButtonProps) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: cores[idMes][1],
            height: 100,
            width: '88%',
            borderRadius: 16,
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 1.5,
            borderColor: cores[idMes][2],
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
            alignSelf: 'center',
            textAlign: 'center',
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
            borderLeftColor: cores[idMes][2],
            flexDirection: 'row',
        },
        viewText: {
            alignItems: 'center',
            width: 220
        },
        ribbonIcon:
        {
            fontSize: 60,
            marginLeft: 35,
            color: cores[idMes][1]
        },
    });

    const navigation = useNavigation();

    function handleMes() {
        navigation.navigate('Mes', {idMes: idMes});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.subcont} onPress={handleMes}>
                <View style={styles.viewText}>
                    <Text style={styles.text}>
                        { months[idMes][0] }
                    </Text>
                    <Text style={styles.subtext}>
                        { months[idMes][1] }
                    </Text>
                </View>
                <View>
                    <FontAwesome5 name="ribbon" style={styles.ribbonIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
};

