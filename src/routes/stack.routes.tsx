import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Inicio } from "../pages/Inicio";
import { Calendario } from "../pages/Calendario";
import { Mes } from "../pages/Mes";
import colors from "../styles/colors";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
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
    </stackRoutes.Navigator>
)

export default AppRoutes;