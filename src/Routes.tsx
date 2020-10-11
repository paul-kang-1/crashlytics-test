import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { Center } from "./Center";

interface RoutesProps {}

const Stack = createStackNavigator();

function Login() {
  return (
    <Center>
      <Text>Loginscreen</Text>
    </Center>
  );
}

export const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
