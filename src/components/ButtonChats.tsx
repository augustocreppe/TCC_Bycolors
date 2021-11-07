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

export function ButtonChats ({ idMes, ...rest }: ButtonProps) {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.body_dark,
            height: 100,
            width: '88%',
            borderRadius: 16,
            alignItems: 'center',
            alignSelf: 'center',
            borderWidth: 1.5,
            borderColor: colors.body_dark,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 20,
        },
        text: {
            fontSize: 22,
            color: cores[idMes][0], 
            fontFamily: fonts.heading,
            marginBottom: 5,
        },
        subtext:
        {
            fontSize: 16,
            color: cores[idMes][0],
            fontFamily: fonts.heading,
        },
        subcont:
        {
            backgroundColor: colors.body_dark,
            height: '100%',
            width: '95%',
            borderTopEndRadius: 16,
            borderBottomEndRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1.5,
            borderLeftColor: colors.body_dark,
            flexDirection: 'row',
        },
        viewText: {
            width: 220
        },
        commentsIcon:
        {
            fontSize: 60,
            marginLeft: 20,
            color: cores[idMes][0],
        },
    });

    const navigation = useNavigation();

    function handleChats() {
        navigation.navigate('Chat', {idMes: idMes});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.subcont} onPress={handleChats}>
                <View style={styles.viewText}>
                    <Text style={styles.text}>
                        { months[idMes][0] }
                    </Text>
                    <Text style={styles.subtext}>
                        { months[idMes][1] }
                    </Text>
                </View>
                <View>
                    <FontAwesome5 name="comments" style={styles.commentsIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
};

