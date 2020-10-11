import React, { useContext, useEffect, useRef, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Center } from "./Center";
import { Button, FlatList, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "./AuthProvider";
import faker from "faker";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";
import { Routes } from "./Routes";
import { addProductRoutes } from "./addProductRoutes";

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();

function Feed({ navigation }: HomeStackNavProps<"Feed">) {
  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        renderItem={({ item }) => {
          return (
            <Button
              title={item}
              onPress={() => {
                navigation.navigate("Product", {
                  name: item,
                });
              }}
            />
          );
        }}
        keyExtractor={(product, idx) => product + idx}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
}

export const HomeStack: React.FC<HomeStackProps> = ({}) => {
  const { logout } = useContext(AuthContext);

  return (
    <Stack.Navigator initialRouteName="Feed">
      {addProductRoutes(Stack)}
      <Stack.Screen
        name="Feed"
        options={{
          headerRight: function display() {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>Log Out</Text>
              </TouchableOpacity>
            );
          },
        }}
        component={Feed}
      />
    </Stack.Navigator>
  );
};
