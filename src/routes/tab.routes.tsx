import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Calendario } from '../pages/Calendario';
import { Comunidade } from '../pages/Comunidade';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

const tabMenu = () => {
    return(
        <Tab.Navigator 
            tabBarOptions={{
            
            activeTintColor: '#FFF',
            labelPosition: 'beside-icon',
            
            style: styles.navigator,
        }}>
            
            <Tab.Screen
                name="Calendario"
                component={Calendario}
            />
                        
            <Tab.Screen
                name="Comunidade"
                component={Comunidade}
            />
                
        </Tab.Navigator>
        
    )
}
        
export default tabMenu;

const styles = StyleSheet.create({
    navigator: {
        backgroundColor: '#12122',
        borderTopColor: 'transparent',
        paddingVertical: 20,
        height:88
    },
});

/*
<AppTab.Screen
    name="Calendario"
    component={Calendario}
    options={{
        tabBarIcon: (({size,color})) => (
            <MaterialIcons
            name = "home"
            size={16}
            color={colors.azul}
            />
        ))
    }}
/>
            
<AppTab.Screen
    name="Comunidade"
    component={Comunidade}
    options={{
    
        tabBarIcon: (({size,color})) => (
            <MaterialIcons
            name = "person"
            size={size}
            color={color}
            />
        ))
    }}
/>
*/