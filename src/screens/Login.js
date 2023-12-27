import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import tw from "twrnc";
import { BGImage, Logo, colors } from "../../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
const Login = () => {
  const { login, getUser } = useContext(AppContext);
  const [email, setEmail] = useState("fawad12@yahoo.com");
  const [password, setPassword] = useState("qwertyui");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const screenWidth = Math.round(Dimensions.get("window").width);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (getEmailValidationStatus ) {
      const res = await login(email, password);
      await getUser(res.user.uid);
      navigation.replace("Home");
    }
  };
  return (
    <View style={tw`flex-1 justify-start items-center`}>
      <Image
        style={tw`w-[${screenWidth}px] h-90`}
        source={BGImage}
        resizeMode="cover"
      />

      {/* {main div} */}
      <View
        style={tw`w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6`}
      >
        <Image source={Logo} style={tw`w-16 h-16`} resizeMode="contain" />
        <Text
          style={tw`py-2 text-[${colors.primaryText}] text-xl font-semibold`}
        >
          Welcome Back!
        </Text>
        <View style={tw`w-full flex items-center justify-center mt-20`}>
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStateValue={email}
            setStateFunction={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStateValue={password}
            setStateFunction={setPassword}
          />
          <TouchableOpacity
            style={tw`w-full px-4 py-2 rounded-xl bg-[${colors.primary}] my-3 flex items-center justify-center`}
          >
            <Text
              style={tw`py-2 text-white text-xl font-semibold`}
              onPress={handleLogin}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <View
            style={tw`w-full flex-row items-center justify-center gap-x-2 mt-6`}
          >
            <Text
              style={tw`text-base text-[${colors.primaryText}] font-semibold`}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.replace("Signup")}>
              <Text
                style={tw`text-base text-[${colors.primaryBold}] font-semibold`}
              >
                Create here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
