import { View, Text, Image } from 'react-native'
import React from 'react'
import Button from './Button'

export default function NoCourse() {
  return (
    <View style={{
        marginTop:40,
        display:'flex',
        alignItems:'center'
    }}>
      <Image source={require('../../assets/images/book.png')}
      style={{
        height:200,
        width:200,
        justifyContent:'center'
      }}
        />
        <Text style={{
            fontFamily:"outfit-bold",
            fontSize:25,
        }}>You don't have any course</Text>
        <Button text={'+ Create New Course'}/>
        <Button text={'+ Explore Existing Courses'}
        type='outline'
        />
    </View>
  )
}