import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Calendario from '../pages/Calendario';
import Mes from '../pages/Mes';
import Login from '../pages/Login';
import colors from '../styles/colors';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator 
        headerMode="none" 
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
    }}>
        <stackRoutes.Screen
            name="Calendario"
            component={Calendario}
        />

        <stackRoutes.Screen
            name="Mes"
            component={Mes}
        />

        <stackRoutes.Screen
            name="Login"
            component={Login}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;