import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    ToastAndroid, ActivityIndicator
} from 'react-native';
import React, {useContext, useState} from 'react';
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../../config/firebaseConfig";
import {getDoc, doc} from "firebase/firestore";
import {UserDetailContext} from '../../context/UserDetailContext'

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userDetail, setUserDetail} = useContext(UserDetailContext)
    const [loading, setLoading] = useState(false)
    const onSignInClick = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(async(resp) => {
                const user = resp.user;
                console.log(user);
                await getUserDetail()
                setLoading(false)
                router.replace('/(tabs)/home')
            })
            .catch(e => {
                console.log(e);
                setLoading(false)
                ToastAndroid.show('Incorrect Email or Password', ToastAndroid.BOTTOM);
            });
    };

    const getUserDetail = async () => {
        const docRef = doc(db, 'users', email);
        const result = await getDoc(docRef);
        console.log(result.data());
        setUserDetail(result.data());
    }

    return (
        <View style={{
            display: 'flex',
            alignItems: "center",
            marginTop: 100,
            paddingTop: 10,
            flex: 1,
            padding: 25,
            backgroundColor: Colors.WHITE
        }}>
            <Image source={require("./../../assets/images/logo.png")}
                   style={{
                       width: 180,
                       height: 180,
                   }}/>
            <Text style={{
                fontSize: 30,
                fontFamily: "outfit-bold",
            }}>Welcome Back</Text>
            <TextInput style={styles.textInput}
                       placeholder="Email"
                       onChangeText={(value)=>setEmail(value)}/>
            <TextInput style={styles.textInput}
                       placeholder="Password"
                       onChangeText={(value)=>setPassword(value)}
                       secureTextEntry={true}/>
            <TouchableOpacity
                onPress={onSignInClick}
                disabled={loading}
                style={{
                    padding: 15,
                    width: '100%',
                    marginTop: 25,
                    backgroundColor: Colors.PRIMARY,
                    fontSize: 20,
                    borderRadius: 10,
                }}>
                {!loading? <Text style={{
                    fontFamily: "outfit",
                    fontSize: 20,
                    textAlign: 'center',
                    color: Colors.WHITE,
                }}>Sign In</Text>:
                    <ActivityIndicator size={'large'} color={Colors.WHITE}/>
                }
            </TouchableOpacity>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
            }}>
                <Text style={{
                    fontFamily: "outfit",
                }}>Don't have an Account?</Text>
                <Pressable
                    onPress={() => router.push("/auth/signUp")}>
                    <Text style={{
                        color: Colors.PRIMARY,
                        fontFamily: 'outfit-bold',
                    }}> Create new one here</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        width: "100%",
        padding: 15,
        fontSize: 18,
        marginTop: 20,
        borderRadius: 10,
    }
});
