import React from 'react';
import { 
    TouchableOpacity,
    Text,
    StyleSheet,
    TouchableOpacityProps,
    View
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { colors } from '../styles/colors';
//import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
    title: string;
}

export function Accordion(){
    return (
        <TouchableOpacity 
            style = {styles.container}
            //{ ... rest}
        >
            <View style = {styles.featherIcon}>
                <Feather
                    name = "chevron-down" 
                    style = {styles.buttonIcon}
                />

                <Text style = {styles.text}>
                     BotãoTexto
                </Text>
            </View>

        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.branco,
        borderWidth: 2,
        borderColor: colors.preto,
        height: 65,
        width: 350,
        borderRadius: 16,
    },

    featherIcon:{
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        color: colors.preto,
        //fontFamily: fonts.heading,
        padding: 10
    },

    buttonIcon: {
        backgroundColor: colors.azul_escuro,
        height: 63,
        width: 68,
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: colors.preto,
        padding: 20,
        fontSize: 32,
        color: colors.branco
    },

})