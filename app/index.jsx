import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import  Colors  from "../constant/Colors"
import {useRouter} from "expo-router";
import {onAuthStateChanged} from 'firebase/auth'
import {auth, db} from './../config/firebaseConfig'
import {getDoc, doc} from "firebase/firestore";
import {useContext} from "react";
import {UserDetailContext} from "../context/UserDetailContext";


export default function Index() {

    const router=useRouter();
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    onAuthStateChanged(auth, async(user)=>{
        if(user){
            const docRef = doc(db, 'users', user.email);
            const result = await getDoc(docRef);
            setUserDetail(result.data());
            router.replace('/(tabs)/home');
        }
    })
  return (

    <View style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
    }}>
      <Image source={require('../assets/images/landing.png')}
        style={{
            width: '100%',
            height: 300,
            marginTop: 70
        }}
         />
        <View style={{
            padding:25,
            backgroundColor: Colors.PRIMARY,
            height:'100%',
            borderTopLeftRadius: 35,
            borderTopRightRadius:35

        }}>
            <Text style={{
                fontSize: 40,
                textAlign:'center',
                color: Colors.WHITE,
                fontFamily:'outfit-bold'
            }}>Welcome to Guru App</Text>

            <Text style={{
                fontSize:20,
                color:Colors.WHITE,
                marginTop:20,
                textAlign:'center',
                fontFamily:'outfit'
            }}> Transform your life by learning new Skills</Text>
        <TouchableOpacity style={styles.button}
                          onPress={()=>router.push('/auth/signUp')}
        >
            <Text style={[
                styles.buttonText, {
                fontFamily:'outfit-bold',
                color: Colors.PRIMARY
            }]}>Get Started</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/auth/signIn')} style={[
                styles.button,{
                backgroundColor: Colors.PRIMARY,
                borderWidth:1,
                borderColor: Colors.WHITE,
            }]}>
                <Text style={[
                    styles.buttonText,{
                    fontFamily:'outfit-bold',
                    color:Colors.WHITE,
                }]}>Already have an Account?</Text>
            </TouchableOpacity>
        </View>

      </View>
  

  );
}

const styles = StyleSheet.create({
    button:{
        padding:15,
        backgroundColor:Colors.WHITE,
        marginTop:20,
        borderRadius:10,
    },
    buttonText:{
        textAlign:'center',
        fontSize:18,
    }
})
