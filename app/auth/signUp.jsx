import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { UserDetailContext } from "../../context/UserDetailContext";

export default function SignUp() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userDetail, setUserDetail } = useContext(UserDetailContext); // Use useContext

    const CreateNewAccount = async () => {

            createUserWithEmailAndPassword(auth, email, password)
            .then(async(resp)=>{
                const user=resp.user;
                console.log(user);
                await SaveUser(user)
                // Save user to Database
        })
                .catch(e=>{
                    console.log(e.message)
        })
    };

    const SaveUser = async (user) => {
        const data={
            name: fullName,
            email: email,
            member: false,
            uid: user?.uid,
        }
        await setDoc(doc(db, "users", email), data)

        setUserDetail(data);
        // Navigate to new Screen
    };

    return (
        <View
            style={{
                display: "flex",
                alignItems: "center",
                marginTop: 100,
                paddingTop: 10,
                flex: 1,
                padding: 25,
                backgroundColor: Colors.WHITE,
            }}
        >
            <Image
                source={require("./../../assets/images/logo.png")}
                style={{
                    width: 180,
                    height: 180,
                }}
            />
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: "outfit-bold",
                }}>Create Account</Text>

            <TextInput
                style={styles.textInput}
                onChangeText={(value) => setFullName(value)} // Use onChangeText and correct name
                placeholder="Full Name"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => setEmail(value)} // Use onChangeText
                placeholder="Email"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => setPassword(value)} // Use onChangeText and correct name
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableOpacity
                onPress={CreateNewAccount}
                style={{
                    fontFamily: "outfit",
                    padding: 15,
                    marginTop: 25,
                    width: "100%",
                    backgroundColor: Colors.PRIMARY,
                    fontSize: 20,
                    borderRadius: 10,
                }}>
                <Text
                    style={{
                        fontFamily: "outfit",
                        fontSize: 20,
                        textAlign: "center",
                        color: Colors.WHITE,
                    }}
                >Create Account</Text>

            </TouchableOpacity>
            <View
                style={{
                    flex: 1,
                    flexDirection: "row",
                    marginTop: 20,
                }}>

                <Text
                    style={{
                        fontFamily: "outfit",
                    }}>Already have an Account?</Text>

                <Pressable onPress={() => router.push("/auth/signIn")}>
                    <Text
                        style={{
                            color: Colors.PRIMARY,
                            fontFamily: "outfit-bold",
                        }}
                    >Sign-in here</Text>
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
    },
});