import { TypedNavigator, StackNavigationState } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import React, { Props, useEffect, useRef, useState } from "react";
import { Button, Text, TouchableOpacity } from "react-native";
import { Center } from "./Center";
import { HomeParamList, HomeStackNavProps } from "./HomeParamList";
import { SearchParamList } from "./SearchParamList";

function Product({ route, navigation }: HomeStackNavProps<"Product">) {
  return (
    <Center>
      <Text>{route.params.name}</Text>
      <Button
        title="Edit Product"
        onPress={() => {
          navigation.navigate("EditProduct", {
            name: route.params.name,
          });
        }}
      />
    </Center>
  );
}

function apiCall(x: any) {
  return x;
}

function EditProduct({ route, navigation }: HomeStackNavProps<"EditProduct">) {
  const [formState] = useState();
  const submit = useRef(() => {});

  submit.current = () => {
    apiCall(formState);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setParams({ submit });
  }, []);

  return (
    <Center>
      <Text>Editing {route.params.name}</Text>
    </Center>
  );
}

export const addProductRoutes = (
  Stack: TypedNavigator<
    HomeParamList | SearchParamList,
    StackNavigationState,
    any,
    any,
    any
  >
) => {
  return (
    <>
      <Stack.Screen
        options={({ route }) => ({
          // headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                route.params.submit?.current();
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          ),
        })}
        name="EditProduct"
        component={EditProduct}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Product: ${route.params.name}`,
        })}
        name="Product"
        component={Product}
      />
    </>
  );
};
