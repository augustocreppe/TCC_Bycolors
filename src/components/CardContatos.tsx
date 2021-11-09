import React from 'react';
import { StyleSheet, Text, View, TouchableOpacityProps, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, cores } from '../styles/colors';
import fonts from '../styles/fonts';

interface ContatoProps extends TouchableOpacityProps {
    idMes: number;
    nomeLugar: string;
    telefone: string;
    site: string;
    email: string;
}

export function Contato ({ idMes, nomeLugar, telefone, site, email, ...rest }: ContatoProps) {
    
    const styles = StyleSheet.create({
        itemContainer: {
            width: '88%',
            height: 140,
            alignSelf: 'center',
            marginBottom: 20,
            backgroundColor: cores[idMes][0],
            borderRadius: 15,
            borderColor: cores[idMes][2],
            borderWidth: 1.5,
            padding: 10,
        },
        titleView: {

        },
        subtext:
        {
            fontSize: 16,
            color: colors.preto,
            fontFamily: fonts.heading,
            textAlign: 'justify',
        },
        nameText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.preto,
            fontFamily: fonts.heading,
            textAlign: 'justify',
        },
        link: {

        },
        hyperlink: {
            fontSize: 16,
            color: colors.body_dark,
            fontFamily: fonts.heading,
            textAlign: 'justify',
        }
    });

    function handleOpenLink() {
        Linking.openURL(site);
    }

    return (
        <View style={styles.itemContainer}>
            <View style={styles.titleView}>
                <Text style={styles.nameText}>{ nomeLugar }</Text>
            </View>

            <View>
                <Text style={styles.subtext}>{ telefone }</Text>
                <TouchableOpacity style={styles.link} onPress={handleOpenLink}>
                    <Text style={styles.hyperlink}>{ nomeLugar }</Text>
                </TouchableOpacity>
                <Text style={styles.subtext}>{ email }</Text>
            </View>
        </View>
    )
};