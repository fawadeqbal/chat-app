import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login, Signup, Splash, Chat, AddToChat } from "../screens";

const Stack = createNativeStackNavigator();
import AppContextProvider from "../context/AppContext";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="AddToChat" component={AddToChat} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
