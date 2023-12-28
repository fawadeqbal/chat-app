import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import tw from "twrnc";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { colors } from "../../assets";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { AppContext } from "../context/AppContext";
import { avatars } from "../../utils/supports";
import { Image } from "react-native";

const Chat = ({ route, navigation }) => {
  const { currentUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const { room } = route.params;
  const [message, setMessage] = useState("");
  const user = auth.currentUser;
  const textInputRef = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const queryMsg = query(
      collection(db, "chats", room?._id, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(queryMsg, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      setMessages(upMsg);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleKeyboardOpen = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const sendMessage = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      roomId: room._id,
      timestamp: timestamp,
      message: message,
      user: currentUser,
    };
    setMessage("");
    await addDoc(collection(doc(db, "chats", room._id), "messages"), _doc)
      .then(() => {})
      .catch((e) => {
        console.log(e.message);
      });
  };
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
          <View style={tw`flex-row items-center justify-center gap-x-3`}>
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
              <Entypo name="dots-three-vertical" size={24} color={"#fbfbfb"} />
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
                <>
                  {messages?.map((msg) =>
                    msg.user.providerData.email ===
                    auth.currentUser.providerData[0].email ? (
                      <>
                        <View style={tw`m-1`}>
                          <View
                           
                            style={tw`self-end px-4 py-2 rounded-tl-2xl bg-[${colors.primary}] rounded-bl-2xl w-auto relative`}
                          >
                            <Text
                              style={tw`text-base font-semibold text-white`}
                            >
                              {msg.message}
                            </Text>
                          </View>
                          <View style={tw`self-end`}>
                            {msg?.timestamp?.seconds && (
                              <Text>
                                {new Date(
                                  parseInt(msg?.timestamp?.seconds) * 1000
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                              </Text>
                            )}
                          </View>
                        </View>
                      </>
                    ) : (
                      <>
                        <View
                      
                          style={tw`self-start flex items-center justify-start gap-x-2`}
                        >
                          <View
                            style={tw`flex-row items-center justify-center gap-x-2`}
                          >
                            {/* image */}
                            <Image
                              style={tw`w-12 h-12 rounded-full`}
                              resizeMode="cover"
                              source={{ uri: avatars[0].image.asset.url }}
                            />

                            {/* text */}
                            <View style={tw`m-1`}>
                              <View
                                style={tw`px-4 py-2 rounded-tl-2xl bg-[${colors.primary}] rounded-bl-2xl w-auto relative`}
                              >
                                <Text
                                  style={tw`text-base font-semibold text-white`}
                                >
                                  {msg.message}
                                </Text>
                              </View>
                              <View style={tw`self-start`}>
                                {msg?.timestamp?.seconds && (
                                  <Text>
                                    {new Date(
                                      parseInt(msg?.timestamp?.seconds) * 1000
                                    ).toLocaleTimeString("en-US", {
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })}
                                  </Text>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </>
                    )
                  )}
                </>
              )}
            </ScrollView>
            <View
              style={tw`w-full flex-row items-center justify-center px-8 gap-x-2`}
            >
              <View
                style={tw`flex-row items-center justify-center px-4 bg-gray-200 rounded-2xl gap-x-4 py-2`}
              >
                <TouchableOpacity onPress={handleKeyboardOpen}>
                  <Entypo name="emoji-happy" size={24} color={"#555"} />
                </TouchableOpacity>
                <TextInput
                  ref={textInputRef}
                  style={tw`flex-1 h-8 text-base text-[${colors.primaryText}] font-semibold`}
                  placeholder="Type here..."
                  placeholderTextColor={"#999"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />

                <TouchableOpacity>
                  <Entypo name="mic" size={24} color={"#43c651"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={tw`pl-4`} onPress={sendMessage}>
                <FontAwesome name="send" size={24} color={"#555"} />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Chat;
