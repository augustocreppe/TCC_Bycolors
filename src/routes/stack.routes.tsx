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
import { Grupos } from "../pages/Grupos";
import { Grupo } from "../pages/Grupo";
import { Chats } from "../pages/Chats";
import { Chat } from "../pages/Chat";
import { LinhaDoTempo } from "../pages/LinhaDoTempo";
import { CriarPost } from "../pages/CriarPost";

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

        <stackRoutes.Screen
            name="Grupos"
            component={Grupos}
        />

        <stackRoutes.Screen
            name="Grupo"
            component={Grupo}
        />

        <stackRoutes.Screen
            name="Chats"
            component={Chats}
        />

        <stackRoutes.Screen
            name="Chat"
            component={Chat}
        />

        <stackRoutes.Screen
            name="LinhaDoTempo"
            component={LinhaDoTempo}
        />

        <stackRoutes.Screen
            name="CriarPost"
            component={CriarPost}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes;