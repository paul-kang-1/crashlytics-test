import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Center } from "./Center";
import { Button, Text } from "react-native";
import { AuthContext } from "./AuthProvider";

interface AppTabsProps {}

const Tabs = createBottomTabNavigator();

function Home() {
  const { logout } = useContext(AuthContext);
  return (
    <Center>
      <Text>HomeScreen</Text>
      <Button title="logout" onPress={() => logout()} />
    </Center>
  );
}

function Search() {
  return (
    <Center>
      <Text>Search</Text>
    </Center>
  );
}

export const AppTabs: React.FC<AppTabsProps> = ({}) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
    </Tabs.Navigator>
  );
};
