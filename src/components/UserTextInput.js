import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { colors } from "../../assets";
const UserTextInput = ({
  placeholder,
  isPass,
  setStateValue,
  setStateFunction,
}) => {
  const [showPass, setShowPass] = useState(true);
  const [icon, setIcon] = useState(null);

  useLayoutEffect(() => {
    switch (placeholder) {
      case "Full Name":
        return setIcon("person");
      case "Email":
        return setIcon("email");
      case "Password":
        return setIcon("lock");
    }
  }, []);
  return (
    <View
      style={tw`border rounded-2xl px-4 py-6 flex-row items-center justify-between my-2 border-gray-200 gap-x-3`}
    >
      <MaterialIcons name={icon} size={24} color={"#6c6d83"} />
      <TextInput
        placeholder={placeholder}
        value={setStateValue}
        onChangeText={(text) => setStateFunction(text)}
        style={tw`flex-1 text-base text-[${colors.primaryText}] font-semibold -mt-1`}
        secureTextEntry={isPass && showPass}
        autoCapitalize="none"
      />
      {isPass && (
        <TouchableOpacity
          onPress={() => {
            setShowPass(!showPass);
          }}
        >
          <Entypo
            name={showPass ? "eye" : "eye-with-line"}
            size={24}
            color={"#6c6d83"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserTextInput;
