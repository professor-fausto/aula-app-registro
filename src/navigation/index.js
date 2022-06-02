import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InicialScreen from "../screens/InicialScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import RecuperarScreen from "../screens/RecuperarScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={
                        {
                            headerShown: false // remove o topo
                        }
                    }
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={
                        {
                            headerShown: false // remove o topo
                        }
                    }
                />
                <Stack.Screen
                    name="Recuperar"
                    component={RecuperarScreen}
                    options={
                        {
                            headerShown: false // remove o topo
                        }
                    }
                />
                <Stack.Screen
                    name="Inicial"
                    component={InicialScreen}
                    options={
                        {
                            headerShown: false, // remove o topo
                        }
                    }
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}


const TabNav = createBottomTabNavigator();

const TabNavigation = () => {
    return (

        <TabNav.Navigator>
            <TabNav.Screen
                name="Inicial"
                component={InicialScreen}
            />
            <TabNav.Screen
                name="Inicial2"
                component={InicialScreen}
            />
        </TabNav.Navigator>

    )
}



