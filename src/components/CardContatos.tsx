import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cores, colors } from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
    idMes: number;
}

interface ContatoProps extends TouchableOpacityProps {
    idContato: number;
    nomeLugar: string;
    telefone: string;
    site: string;
    email: string;
    id_doenca: number;
    excluido: boolean;
}

export function Contato ({ idContato, nomeLugar, telefone, site, email, id_doenca, excluido, ...rest }: ContatoProps, { idMes }: ButtonProps) {
    
    const styles = StyleSheet.create({
        container: {
            marginTop: 20,
            alignSelf: 'center',
            height: '100%',
            width: '90%',
        },
        text: {
            fontSize: 22,
            color: colors.preto, 
            fontFamily: fonts.heading,
            marginLeft: 15,
            textAlign: 'justify',
        },
        subtext:
        {
            fontSize: 16,
            color: colors.preto,
            fontFamily: fonts.heading,
            textAlign: 'justify',
            marginLeft: 15,
        },
        viewText: {
            alignItems: 'flex-start',
            width: 220,
            height: '100%',
            marginBottom: 20
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
        itemContainer: {
            backgroundColor: colors.vermelho_claro,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 15,
            borderColor: colors.vermelho_escuro,
            borderWidth: 1.5,
        },
        innerItemLabel: {
            //backgroundColor: cores[idMes][0],
            paddingVertical: 10,
            fontFamily: fonts.text,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            textAlign: 'justify',
            //borderColor: cores[idMes][2],
            borderWidth: 1.5,
            borderTopWidth: 0,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <View style={styles.viewText}>
                    <Text style={styles.text}>
                        ID do Contato: { [idContato] }
                    </Text>
                    <Text style={styles.subtext}>
                        { [nomeLugar] }
                    </Text>
                    <Text style={styles.subtext}>
                        { [telefone] }
                    </Text>
                    <Text style={styles.subtext}>
                        { [site] }
                    </Text>
                    <Text style={styles.subtext}>
                        { [email] }
                    </Text>
                    <Text style={styles.subtext}>
                        { [id_doenca] }
                    </Text>
                    <Text style={styles.subtext}>
                        { [excluido] }
                    </Text>
                </View>
        </View>
        </View>
        </SafeAreaView>
    )
};