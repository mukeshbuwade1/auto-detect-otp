/**
 * Sample React Native App to detect OTP automatically 
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  getHash,
  startOtpListener,
  useOtpVerify,
  removeListener
} from 'react-native-otp-verify';
import OTPScreen from './src/component/OTPScreen';
import InputScreen from './src/component/InputScreen';


function App(): JSX.Element {

  const [code, setCode] = useState<string | undefined>();
  const [number, setNumber] = useState<string | undefined>();
  const [screenName, setScreenName] = useState<string>("inputScreen");
  useEffect(() => {
    getHash().then(hash => {
      console.log("hash", hash)
      // use this hash in the message.
    }).catch(console.log);

    startOtpListener((message) => {
      // extract the otp using regex e.g. the below regex extracts 6 digit otp from message
      const otp =  /(\d{6})/g.exec(message)?.[1] ;
      // const regex = /(\d{6})/g;
      // const match = regex.exec(message)||"";
      // const otp = match[1];
      setCode("" + otp);
    });
    return () => removeListener();
  }, []);

  return (
    <SafeAreaView >
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"#03DAC6"}
      />
      {
        screenName == "inputScreen"
          ? <InputScreen setScreenName={setScreenName} setNumber={setNumber} number={number} />
          : <OTPScreen code={code} setCode={setCode} number={number} setScreenName={setScreenName} />
      }

    </SafeAreaView>
  );
}
export default App;



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
    color: "#000"
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
