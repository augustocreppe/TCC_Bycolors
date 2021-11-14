import { Feather } from '@expo/vector-icons';
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
            height: 'auto',
            alignSelf: 'center',
            marginBottom: 20,
            backgroundColor: cores[idMes][0],
            borderRadius: 15,
            borderColor: cores[idMes][2],
            borderWidth: 1.5,
            padding: 10,
            paddingHorizontal: 15,
        },
        subtext:
        {
            fontSize: 16,
            color: colors.preto,
            fontFamily: fonts.heading,
            textAlign: 'justify',
            paddingRight: 15,
        },
        nameText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.preto,
            fontFamily: fonts.heading,
            textAlign: 'justify',
        },
        link: {
            flexDirection: 'row',
        },
        hyperlink: {
            fontSize: 16,
            color: colors.body_dark,
            fontFamily: fonts.heading,
            textAlign: 'justify',
        },
        icon: {
            fontSize: 20,
            marginRight: 5,
        },
        contentView: {
            flexDirection: 'row',
            marginVertical: 6,
            width: 300,
        },
        contentMegaView: {
            paddingRight: 15,
        }
    });

    function handleOpenLink() {
        Linking.openURL(site);
    }

    function handleOpenPhone() {
        Linking.openURL(`tel:${telefone}`)
    }

    function handleOpenMail() {
        Linking.openURL(`mailto:${email}`)
    }

    return (
        <View style={styles.itemContainer}>
            <View>
                <Text style={styles.nameText}>{ nomeLugar }</Text>
            </View>
            <View style={styles.contentMegaView}>
                
                {
                    (telefone != '') &&

                    <View style={styles.contentView}>
                        <TouchableOpacity style={styles.link} onPress={handleOpenPhone}>
                        <Feather name="phone" style={styles.icon}/>
                        <Text style={styles.subtext}>{ telefone }</Text>
                        </TouchableOpacity>
                    </View>
                }

                {
                    (site != '') &&

                    <View style={styles.contentView}>
                        <TouchableOpacity style={styles.link} onPress={handleOpenLink}>
                        <Feather name="monitor" style={styles.icon}/>
                        <Text style={styles.hyperlink}>{ nomeLugar }</Text>
                        </TouchableOpacity>
                    </View>
                }
                
                {
                    (email != '') &&

                    <View style={styles.contentView}>
                        <TouchableOpacity style={styles.link} onPress={handleOpenMail}>
                        <Feather name="mail" style={styles.icon}/>
                        <Text style={styles.subtext}>{ email }</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
        </View>
    )
};