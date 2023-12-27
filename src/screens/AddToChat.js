import { View, Text, Image, TextInput } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import tw from "twrnc";
import { Logo, colors } from "../../assets";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { auth, db } from "../config/firebase";
import { AppContext } from "../context/AppContext";
import {setDoc,doc} from 'firebase/firestore'
const Chat = () => {
  const { getUser } = useContext(AppContext);
  const user = auth.currentUser;
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();
  const [addChat, setAddChat] = useState("");
  useEffect(() => {
    getUserDate();
  }, []);

  async function getUserDate() {
    const res = await getUser(user.uid);
    setCurrentUser(res);
    console.log(res);
  }
  const createNewChat = () => {
    let id = `${Date.now()}`;

    const _doc = {
      _id: id,
      user: currentUser,
      chatName:addChat
    };

    if(addChat!==''){
        setDoc(doc(db,"chats",id),_doc)
        .then(()=>{
            setAddChat('')
            navigation.replace("Home")
        })
        .catch((e)=>{
            alert(e.message)
        })
    }
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

          {/* last section */}
          <View style={tw`flex-row items-center justify-center space-x-3`}>
            <Image source={Logo} style={tw`w-12 h-12`} resizeMode="contain" />
          </View>
        </View>
      </View>

      <View
        style={tw`w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10`}
      >
        <View style={tw`w-full px-4 py-6`}>
          <View
            style={tw`w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 gap-x-3`}
          >
            {/* Icons */}
            <Ionicons name="chatbubbles" size={24} color={"#777"} />

            {/* text input */}
            <TextInput
              style={tw`flex-1 text-lg text-[${colors.primaryText}] h-12 w-full`}
              placeholder="Create a chat"
              placeholderTextColor={"#999"}
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
            />
            {/* Icons */}
            <TouchableOpacity onPress={createNewChat}>
              <FontAwesome name="send" size={24} color={"#777"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Chat;
