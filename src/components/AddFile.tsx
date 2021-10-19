import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { cores } from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    idMes: number;
}

export function AddFile ({ idMes, ...rest }: ButtonProps) {
    const navigation = useNavigation();

    function handleAddPost() {
        if(idMes == 0)
            navigation.navigate('CriarPostGeral', {idMes: idMes});
        else
            navigation.navigate('CriarPost', {idMes: idMes});
    }

    const styles = StyleSheet.create({
        buttonAdd: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            marginLeft: '65%',
            height: 56,
            width: 56,
        },
        buttonAddIcon: {
            fontSize: 40,
            color: cores[idMes][2],
        },
    });

    return (
        <TouchableOpacity onPress={handleAddPost} style={styles.buttonAdd}>
            <Feather name="plus" style={styles.buttonAddIcon}/>
        </TouchableOpacity>
    )
};