import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { Center } from "./Center";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./AuthProvider";
import { AppTabs } from "./AppTabs";
import { AuthStack } from "./AuthStack";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const { user, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((userString) => {
        if (userString) {
          login();
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <Text>Loading</Text>
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
