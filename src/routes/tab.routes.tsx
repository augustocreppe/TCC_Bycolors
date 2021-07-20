import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {MaterialIcons} from '@expo/vector-icons'; 

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {

    return(
    <AppTab.Navigator 
            tabBarOptions={{
            
            activeTintColor: '#FFF',
            labelPosition: 'beside-icon',
            
            style:{
                backgroundColor: '#12122',
                borderTopColor: 'transparent',
                paddingVertical: 20,
                height:88
            },
            
            }}>
            
            <AppTab.Screen
                    name="Inicio"
                    component={Inicio}
                    options={{
                    
                        tabBarIcon: (({size,color})) => (
                            <MaterialIcons
                            name = "home"
                            size={size}
                            color={color}
                            />
                            
                        ))
                    
                    }}
                    
                    />
                    
            <AppTab.Screen
                    name="Usuario"
                    component={Usuario}
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
                    
            </AppTab.Navigator>
            
            )
            
        }
        
export default AuthRoutes;