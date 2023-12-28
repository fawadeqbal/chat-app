import { View, Text, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../context/AppContext";
import React, { useContext } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../assets";
import { avatars } from "../../utils/supports";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const Profile = () => {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser } = useContext(AppContext);

  const handleSignout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    navigation.replace("Login");
  };
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-start pt-8`}>
      {/* icons */}
      <View style={tw`w-full flex-row items-center justify-between px-4`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={32} color={"#555"} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color={"#555"} />
        </TouchableOpacity>
      </View>

      {/* profile */}
      <View style={tw`items-center justify-center`}>
        <View
          style={tw`relative border-2 border-[${colors.primary}] p-1 rounded-full`}
        >
          <Image
            style={tw`w-24 h-24 rounded-full`}
            resizeMode="contain"
            source={{ uri: avatars[0].image.asset.url }}
          />
        </View>

        <Text style={tw`text-xl font-semibold text-primaryText`}>
          {currentUser?.fullName}
        </Text>
        <Text style={tw`text-base font-semibold text-primaryText`}>
          {currentUser?.providerData.email}
        </Text>
      </View>

      {/* icons section */}
      <View style={tw`w-full flex-row items-center justify-evenly py-6`}>
        <View style={tw`items-center justify-center`}>
        <TouchableOpacity style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-200`}>
          <MaterialIcons name="messenger-outline" size={24} color={"#555"} />
        </TouchableOpacity>
        <Text style={tw`text-sm text-[${colors.primaryText}] py-1`}>Message</Text>
        </View>

        <View style={tw`items-center justify-center`}>
        <TouchableOpacity style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-200`}>
          <Ionicons name="ios-videocam-outline" size={24} color={"#555"} />
        </TouchableOpacity>
        <Text style={tw`text-sm text-[${colors.primaryText}] py-1`}>Video Call</Text>
        </View>

        <View style={tw`items-center justify-center`}>
        <TouchableOpacity style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-200`}>
          <Ionicons name="call-outline" size={24} color={"#555"} />
        </TouchableOpacity>
        <Text style={tw`text-sm text-[${colors.primaryText}] py-1`}>Call</Text>
        </View>

        <View style={tw`items-center justify-center`}>
        <TouchableOpacity style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-200`}>
          <Entypo name="dots-three-horizontal" size={24} color={"#555"} />
        </TouchableOpacity>
        <Text style={tw`text-sm text-[${colors.primaryText}] py-1`}>More</Text>
        </View>
      </View>

      {/* Media Shared */}

      {/* settings options */}
      <View style={tw`w-full px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="security" size={24} color={"#555"}/>
          <Text style={tw`text-base font-semibold text-[${colors.primaryText}] px-3`}>Privacy</Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"}/>
      </View>

      <View style={tw`w-full px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="message" size={24} color={"#555"}/>
          <Text style={tw`text-base font-semibold text-[${colors.primaryText}] px-3`}>Groups</Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"}/>
      </View>

      <View style={tw`w-full px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="music-note" size={24} color={"#555"}/>
          <Text style={tw`text-base font-semibold text-[${colors.primaryText}] px-3`}>Media's & Downloads</Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"}/>
      </View>

      <View style={tw`w-full px-6 py-4 flex-row items-center justify-between`}>
        <View style={tw`flex-row items-center`}>
          <MaterialIcons name="person" size={24} color={"#555"}/>
          <Text style={tw`text-base font-semibold text-[${colors.primaryText}] px-3`}>Account</Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"}/>
      </View>

      <TouchableOpacity onPress={handleSignout} style={tw`w-full px-6 py-4 flex-row items-center justify-center mt-10`}>
        <Text style={tw`text-lg font-semibold text-[${colors.primaryBold}] px-3`}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
