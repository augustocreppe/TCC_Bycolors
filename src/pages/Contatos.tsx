import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableOpacityProps, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { cores, colors } from '../styles/colors';
import { months } from '../styles/info';
import fonts from '../styles/fonts';
import { Contato } from '../components/CardContatos';

export function Contatos() {
    return (
        <Contato 
            idContato={2}
            nomeLugar= 'Hospital de Base de Bauru'
            telefone= '(14) 3231-4770'
            site='https://www.famesp.org.br/transparencia/hbb/'
            email= 'sau.hb@famesp.org.br'
            id_doenca= {3}
            excluido= {false}
        />
    );
}