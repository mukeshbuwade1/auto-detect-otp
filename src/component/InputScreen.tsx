import { StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import axios from 'axios'

const { width, height } = Dimensions.get("window");

interface propsType {
    setScreenName: (e: string) => void
    setNumber: (e: string) => void
    number?: string
}
const InputScreen: React.FC<propsType> = ({ setScreenName, setNumber, number }) => {


    function submit() {
        var data = JSON.stringify({
            "originator": "SignOTP",
            "recipient": number,
            "content": "Greetings from Mukesh(app developer), this is a testing code your mobile verification code is: {}.  7KPdjHs9uGM",
            "expiry": "600",
            "data_coding": "text"
        });

        var config = {
            method: 'post',
            url: 'https://api.d7networks.com/verify/v1/otp/send-otp',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiOTFhZWFlMzctNjg0OS00ZjZjLThjMWYtZjczZTFiYWRhN2ZmIn0.86rZSt_vdkw5wQRZoKZkl0hkK0wbqSEDxLHn0Rw2_6I',
                'Content-Type': 'application/json'
            },
            data: data
        };
        getOtp(config)
    }
    const getOtp = async (config: object) => {
        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setScreenName("otpScreen")
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function validation() {
        let reg = /^([+]\d{2})?\d{10}$/
        if (!number || number.length == 0) {
            Alert.alert("Enter Number first")
            return false
        }
        else if (number.length < 10) {
            Alert.alert("Enter valid Number")
            return false
        } else {
            // setScreenName("otpScreen")
            submit()
        }
    }
    return (
        <View style={styles.box} >
            <Text style={styles.text}>Create otp request</Text>
            <View style={{ width: "80%" }}>
                <Text style={styles.text1}>Enter Mobile Number with Country Code</Text>
                <TextInput
                    // ref={inputRef}
                    placeholder='+919700000079' style={styles.inputBox}
                    value={number}
                    onChangeText={(str) => {
                        let text = str.replace(/\s/g, '')
                        setNumber(text)
                    }}
                    maxLength={15}
                    keyboardType={"phone-pad"}
                />
                <TouchableOpacity style={styles.btn} onPress={validation}>
                    <Text style={styles.btn_tx}>Get OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }}
                    onPress={() => {
                        setScreenName("otpScreen")
                    }} >
                    <Text style={styles.normal_btn_tx}>*In case send OTP API is not working. you can visit enter OTP screen by clicking <Text style={{ color: "#038074" }}>here</Text></Text>
                </TouchableOpacity>

            </View>
        </View>        
    )
}

export default InputScreen

const styles = StyleSheet.create({
    box: {
        width, height,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: -200,
        marginBottom: 50,
        fontWeight: "700",
        fontSize: 20, color: "#03DAC6",
        textTransform: "uppercase"
    },
    text1: {
        fontWeight: "700",
        fontSize: 15,
        color: "#03DAC6",
        textTransform: "capitalize",
    },
    inputBox: {
        borderWidth: 0,
        borderBottomWidth: 1,
        fontWeight: "700",
        fontSize: 30,
        color: "#03DAC6",
        letterSpacing: 2,
    },
    btn: {
        width: "100%",
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
    normal_btn_tx: {
        fontWeight: "600",
        fontSize: 12,
        color: "#252525",
        fontStyle: "italic"
    }
})