import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import tabBarIcon from "@expo/vector-icons"
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{
      headerShown:false
    }}>
        <Tabs.Screen name="home"
        options={{
          tabBarIcon:({color, size})=><AntDesign name="home" size={24} color={color} />,
          tabBarLabel:'Home'
          }}
        />
        
        <Tabs.Screen name="explore"
        options={{
          tabBarIcon:({color, size})=><Ionicons name="analytics-sharp" size={24} color={color} />,
          tabBarLabel:'Explore'
          }}
        />

        <Tabs.Screen name="progress"
        options={{
          tabBarIcon:({color, size})=><MaterialIcons name="travel-explore" size={24} color={color} />,
          tabBarLabel:'Progress'
          }}
        />

        <Tabs.Screen name="profile"
        options={{
          tabBarIcon:({color, size})=><AntDesign name="profile" size={24} color={color} />,
          tabBarLabel:'Profile'
          }}
        />
    </Tabs>
  )
}

export default TabLayout;