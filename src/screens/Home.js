import {
  View,
  Text,
  Touchable,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { signOut } from "firebase/auth";
import {collection,query,orderBy,onSnapshot} from 'firebase/firestore'
import { auth, db } from "../config/firebase";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { Logo, colors } from "../../assets";
import { ScrollView } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { avatars } from "../../utils/supports";
const Home = () => {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const [chats,setChats]=useState([])
  
  useLayoutEffect(()=>{
    const chatQuery= query(collection(db,"chats"),orderBy("_id","desc"))
    const unsubscribe= onSnapshot((chatQuery),(querySnapshot)=>{
        const chatRooms = querySnapshot.docs.map((doc)=> doc.data())
        setChats(chatRooms)
        setIsLoading(false)
    })
    return unsubscribe
  },[])

  return (
    <View style={tw`flex-1 pt-7`}>
      <SafeAreaView>
        <View
          style={tw`w-full flex-row items-center justify-between px-4 py-2`}
        >
          <Image source={Logo} style={tw`w-12 h-12`} resizeMode="contain" />
          <TouchableOpacity
            onPress={()=> navigation.navigate("Profile")}
            style={tw`w-12 h-12 rounded-full border border-[${colors.primary}] flex items-center justify-center`}
          >
            <Image source={{uri:avatars[0].image.asset.url}} style={tw`w-full h-full rounded-full`} resizeMode="cover" />
          </TouchableOpacity>
        </View>

        <ScrollView style={tw`w-full px-4 pt-2`}>
          <View style={tw`w-full`}>
            <View
              style={tw`w-full flex-row items-center justify-between px-4 py-2`}
            >
              <Text
                style={tw`text-[${colors.primaryText}] text-base font-extrabold pb-2`}
              >
                Messages
              </Text>

              <TouchableOpacity style={tw``} onPress={()=>navigation.navigate("AddToChat")}>
                <Ionicons name="chatbox" size={28} color={"#555"} />
              </TouchableOpacity>
            </View>
            {isLoading ? (
              <>
                <View style={tw`w-full flex items-center justify-center`}>
                  <ActivityIndicator size={"large"} color={"#43c651"} />
                </View>
              </>
            ) : (
              <>
                {chats && chats.length>0?
                (<>
                {
                  chats.map((room)=>(
                    <MessageCard key={room._id} room={room}/>
                  ))
                }
                  
                </>)
                :
                (<>
                
                </>)}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* <TouchableOpacity onPress={handleSignout}>SignOut</TouchableOpacity> */}
    </View>
  );
};

const MessageCard = ({room}) => {
  const navigation=useNavigation()
  return (
    <TouchableOpacity
      style={tw`w-full flex-row items-center justify-start px-4 py-2`}
      onPress={()=>navigation.navigate("Chat",{room:room})}
    >
      {/* Images */}
      <View
        style={tw`w-16 h-16 rounded-full flex items-center border-2 border-[${colors.primary}] p-1 justify-center`}
      >
        <FontAwesome5 name="users" size={24} color="#555" />
      </View>

      {/* content */}
      <View style={tw`flex-1 flex items-start justify-center ml-4`}>
        <Text style={tw`text-[#333] text-base font-semibold capitalize`}>
          {room.chatName}
        </Text>
        <Text style={tw`text-sm text-[${colors.primaryText}] `}>hi</Text>
      </View>

      {/* time text */}
      <Text style={tw`text-[${colors.primary}] px-4 text-base font-semibold`}>27 min</Text>
    </TouchableOpacity>
  );
};
export default Home;
