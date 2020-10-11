import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { Button, FlatList, Text } from "react-native";
import { Center } from "./Center";
import { SearchParamList, SearchStackNavProps } from "./SearchParamList";
import faker from "faker";
import { addProductRoutes } from "./addProductRoutes";

interface SearchStackProps {}

const Stack = createStackNavigator<SearchParamList>();

function Search({ navigation }: SearchStackNavProps<"Search">) {
  const [show, setShow] = useState(false);
  return (
    <Center>
      <Button
        title="Search Products"
        onPress={() => {
          setShow(true);
        }}
      />
      {show ? (
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
      ) : null}
    </Center>
  );
}
export const SearchStack: React.FC<SearchStackProps> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};
