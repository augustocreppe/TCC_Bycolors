import React from 'react';
import { StyleSheet, TouchableOpacityProps, View } from 'react-native';
import { cores } from '../styles/colors';
import fonts from '../styles/fonts';
import {ExpandableListView} from 'react-native-expandable-listview';

interface ButtonProps extends TouchableOpacityProps{
    idMes: number;
}

export function Accordion({ idMes, ...rest }: ButtonProps) {
    const styles = StyleSheet.create({
        container:{
            marginTop: 20,
            alignSelf: 'center',
            height: '100%',
            width: '90%',
        },
        itemLabel: {
            fontFamily: fonts.heading,
            fontSize: 24,
            marginLeft: 15
        },
        itemContainer: {
            backgroundColor: cores[idMes][1],
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginTop: 15,
            borderColor: cores[idMes][2],
            borderWidth: 1.5,
        },
        innerItemLabel: {
            backgroundColor: cores[idMes][0],
            paddingVertical: 10,
            fontFamily: fonts.text,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            textAlign: 'justify',
            borderColor: cores[idMes][2],
            borderWidth: 1.5,
            borderTopWidth: 0,
        },
        itemImageIndicator: {
            height: 20,
            width: 20,
        },
        itemSeparator: {
            //
        },
        defaultLoader: {
            //
        },
        innerItemSeparator: {
            //
        },
        expandableListView: {
            //
        },
        innerItemContainer: {
            //
        },
    })

    return (
        <View style={styles.container}>
            <ExpandableListView
                itemLabelStyle={styles.itemLabel}
                itemSeparatorStyle={styles.itemSeparator}
                defaultLoaderStyles={styles.defaultLoader}
                itemContainerStyle={styles.itemContainer}
                innerItemLabelStyle={styles.innerItemLabel}
                innerItemSeparatorStyle={styles.innerItemSeparator}
                ExpandableListViewStyles={styles.expandableListView}
                innerItemContainerStyle={styles.innerItemContainer}
                itemImageIndicatorStyle={styles.itemImageIndicator}
                data={Conteudo}
            />
        </View>
    )
};

const Conteudo = [
    {
        id: '1',
        categoryName: 'Definição',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '2',
        categoryName: 'Estatísticas',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '3',
        categoryName: 'O que aumenta o Risco',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '4',
        categoryName: 'Como Prevenir',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '5',
        categoryName: 'Sinais e Sintomas',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '6',
        categoryName: 'Detenção Precoce',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '7',
        categoryName: 'Diagnóstico',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '8',
        categoryName: 'Tratamento',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
    {
        id: '9',
        categoryName: 'Contatos',
        subCategory: [{id: '1', name:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar, sem id pulvinar laoreet, lacus ligula mattis tortor, vel tincidunt est ante et neque. Vestibulum accumsan diam ac ullamcorper sagittis. Sed at dapibus felis, non facilisis turpis. Aliquam lorem metus, lobortis ut mi id, egestas maximus ex. Mauris scelerisque dictum leo vehicula egestas. Vestibulum eu ipsum id nibh scelerisque vulputate.",}],
    },
];