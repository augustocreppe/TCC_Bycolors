import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Mes() {
    return (
        <View style={styles.container}>
            <Text>Página Mês</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
