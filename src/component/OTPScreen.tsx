import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';

interface propsType {
    code?: string,
    setCode: (e: string) => void,
    setScreenName: (e: string) => void,
    number?: string
}

const OTPScreen: React.FC<propsType> = ({ code, setCode, number, setScreenName }) => {

    const myAlert: () => void = () => {
        Alert.alert("Info", "Screen or Function is under Construction")
    }

    return (
        <View style={{
            justifyContent: "center", alignItems: "center",
        }}>
            {/* back button */}
            <TouchableOpacity
                onPress={() => setScreenName("inputScreen")}
                style={{ position: "absolute", top: 25, left: 15, backgroundColor: "#03DAC6", borderRadius: 20, width: 30, height: 30, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../assets/image/left-arrow.png")} alt={"img"} style={{
                    width: 15, height: 15, tintColor: "#fff"
                }} resizeMode={"contain"} />
            </TouchableOpacity>

            {/* heading and subheading */}
            <Text
                style={{
                    fontWeight: "700", width: "100%", textAlign: "center", fontSize: 20, color: "#03DAC6", marginTop: 100
                }}
            >Auto-Detect-OTP</Text>
            <Text style={{ marginTop: 30 }}>Enter the OTP send to <Text style={{ fontWeight: "700" }}>{number ?? "+91XXXXXXXXXX"}</Text> </Text>

            {/* otp input field  */}
            <OTPInputView
                style={{ width: '80%', height: 100, }}
                pinCount={6}
                code={code}
                onCodeChanged={code => { setCode(code) }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code => {
                    console.log(`Code is ${code}, you are good to go!`)
                    //verifyOTPFunction()
                })}
                placeholderCharacter={"0"}
                placeholderTextColor={"#ccc"}
            />

            <Text
                onPress={myAlert}
                style={{
                    fontWeight: "700",
                    fontSize: 16,
                    color: "#03DAC6",
                    marginTop: 10
                }}>Resend OTP</Text>

            <TouchableOpacity style={styles.btn}
                onPress={myAlert}
            >
                <Text style={styles.btn_tx}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OTPScreen

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: "#000",
        fontSize: 20,
        fontWeight: "700"
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    btn: {
        width: "80%",
        height: 40,
        backgroundColor: "#03DAC6",
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",

    },
    btn_tx: {
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 15,
        color: "#fff",
        letterSpacing: 1,
    },
});
