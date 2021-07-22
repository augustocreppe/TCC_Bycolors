import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Inicio } from "../pages/Inicio";
import { Calendario } from "../pages/Calendario";
import { Mes } from "../pages/Mes";
import { Comunidade } from "../pages/Comunidade";
import { Usuario } from "../pages/Usuario";
import { MenuLateral } from "../pages/MenuLateral";
import { Configuracoes } from "../pages/Configuracoes";
import { colors } from "../styles/colors";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.background
            },
        }}
    > 
    	<stackRoutes.Screen
            name="Inicio"
            component={Inicio}
        />

        <stackRoutes.Screen
            name="Calendario"
            component={Calendario}
        />

        <stackRoutes.Screen
            name="Mes"
            component={Mes}
        />

        <stackRoutes.Screen
            name="Comunidade"
            component={Comunidade}
        />

        <stackRoutes.Screen
            name="Usuario"
            component={Usuario}
        />

        <stackRoutes.Screen
            name="MenuLateral"
            component={MenuLateral}
        />

        <stackRoutes.Screen
            name="Configuracoes"
            component={Configuracoes}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;