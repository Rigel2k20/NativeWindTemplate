import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { UserDetailContext } from "../context/UserDetailContext";
import React, { useState } from "react";

export default function RootLayout() {
    const [loaded, Error] = useFonts({
        'outfit': require("../assets/fonts/Outfit-Regular.ttf"),
        "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    });

    const [userDetail, setUserDetail] = useState<any>(null);



    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                {/* Add more screens here */}
            </Stack>
        </UserDetailContext.Provider>
    );
}