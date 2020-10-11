import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { AuthNavProps, AuthParamList } from "./AuthParamList";
import { AuthContext } from "./AuthProvider";
import { Center } from "./Center";

interface AuthStackProps {}
const Stack = createStackNavigator<AuthParamList>();

function Login({ navigation }: AuthNavProps<"Login">) {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>LoginScreen</Text>
      <Button
        title="log in"
        onPress={() => {
          login();
        }}
      />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </Center>
  );
}

function Register({ navigation, route }: AuthNavProps<"Register">) {
  return (
    <Center>
      <Text>Currently at: {route.name}</Text>
      <Button
        title="Go back to Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
}

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        options={{ headerTitle: "Sign In" }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerTitle: "Sign Up" }}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
};
