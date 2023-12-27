import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import tw from "twrnc";
import { Logo } from "../../assets";
import { auth } from "../config/firebase";
const Splash = () => {
  const navigation = useNavigation();
  const user=auth.currentUser
  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate("Home");
      } else {
        navigation.replace("Login");
      }
    }, 3000);
  });
  return (
    <View style={tw`flex-1 justify-center items-center gap-y-24`}>
      <Image source={Logo} style={tw`w-24 h-24`} resizedMode="contained" />
      <ActivityIndicator size={"large"} color={"#43c651"} />
    </View>
  );
};

export default Splash;
