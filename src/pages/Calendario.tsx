import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Calendario() {
    return (
        <View style={styles.container}>
            <Text>Página Calendário</Text>
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
