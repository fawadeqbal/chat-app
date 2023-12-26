import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from "twrnc"

const Splash = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const navigation= useNavigation()
    useEffect(()=>  {
        setTimeout(()=>{
            if(!currentUser){
                navigation.navigate("Login")
            }else{
                navigation.navigate("Home")
            }
        },3000)
    })
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash