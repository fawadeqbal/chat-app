import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../../assets";


const Chat = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { room } = route.params;
  console.log(room);
    const [message, setMessage] = useState("")
  
  return (
    <View style={tw`flex-1`}>
      <View style={tw`w-full bg-[${colors.primary}] px-4 py-6 flex-[0.2]`}>
        <View
          style={tw`flex-row items-center justify-between w-full px-4 py-12`}
        >
          {/* go back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
          </TouchableOpacity>

          {/* middle */}
          <View style={tw`flex-row items-center justify-center space-x-3`}>
            <View
              style={tw`w-12 h-12 rounded-full border-white border flex items-center justify-center`}
            >
              <FontAwesome5 name="users" size={24} color={"#fbfbfb"} />
            </View>
            <View>
              <Text
                style={tw`text-gray-50 text-base font-semibold capitalize ml-2`}
              >
                {room.chatName.length > 16
                  ? `${room.chatName.slice(0, 16)}...`
                  : room.chatName}
                {""}
              </Text>
              <Text
                style={tw`text-gray-100 text-sm font-semibold capitalize ml-2`}
              >
                Online
              </Text>
            </View>
          </View>
          {/* last section */}
          <View style={tw`flex-row items-center justify-center gap-x-3`}>
            <TouchableOpacity>
              <FontAwesome5 name="video" size={24} color={"#fbfbfb"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="phone" size={24} color={"#fbfbfb"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                name="dots-three-vertical"
                size={24}
                color={"#fbfbfb"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={tw`w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10`}
      >
        <KeyboardAvoidingView
          style={tw`flex-1`}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={160}
        >
          <>
            <ScrollView>
              {isLoading ? (
                <>
                  <View style={tw`w-full flex items-center justify-center`}>
                    <ActivityIndicator size={"large"} color={"#43c651"} />
                  </View>
                </>
              ) : (
                <></>
              )}
            </ScrollView>
            <View style={tw`w-full flex-row items-center justify-center px-8 gap-x-2`}>
              <View
                style={tw`flex-row items-center justify-center px-4 bg-gray-200 rounded-2xl gap-x-4 py-2`}
              >
                <TouchableOpacity >
                    <Entypo name="emoji-happy" size={24} color={"#555"}/>
                </TouchableOpacity>
                <TextInput 
                style={tw`flex-1 h-8 text-base text-primaryText font-semibold`}
                placeholder="Type here..."
                placeholderTextColor={"#999"}
                value={message}
                onChangeText={(text) => setMessage(text)}
                />

                <TouchableOpacity>
                    <Entypo name="mic" size={24} color={"#43c651"}/>
                </TouchableOpacity>
                
              </View>
              <TouchableOpacity>
                    <FontAwesome name="send" size={24} color={"#555"}/>
                </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Chat;
