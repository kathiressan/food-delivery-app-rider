import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import RiderDetail from "../components/RiderDetail";
import { useSelector } from "react-redux";
import { selectAccount } from "../slices/accountSlice";

const RiderProfileScreen = () => {
  const [name, setName] = useState("Mohamed Haris");
  const [phoneNumber, setPhoneNumber] = useState("0176978086");
  const [password, setPassword] = useState("password");
  const [vehicleModel, setVehicleModel] = useState("Yamaha LC");
  const [preferredBank, setPreferredBank] = useState("Bank Islam");
  const [bankAccNum, setBankAccNum] = useState("08090911023");
  const account = useSelector(selectAccount);
  return (
    <SafeAreaView style={tw`flex bg-[#BEDA54] h-full`}>
      <Header />
      <View
        style={[
          tw`border p-3 flex flex-row justify-between`,
          { backgroundColor: "rgba(255,255,255,0.6)" },
        ]}
      >
        <Text>Wallet</Text>
        <Text>{`RM: ${account.totalWallet}`}</Text>
      </View>
      <View
        style={[
          tw`p-2 border mt-5`,
          { backgroundColor: "rgba(255,255,255,0.6)" },
        ]}
      >
        <RiderDetail field={"Name"} detail={name} />
        <RiderDetail field={"Password"} detail={password} />
        <RiderDetail field={"Phone number"} detail={phoneNumber} />
        <RiderDetail field={"Vehicle"} detail={vehicleModel} />
        <RiderDetail field={"Bank Type"} detail={preferredBank} />
        <RiderDetail field={"Bank account number"} detail={bankAccNum} />
      </View>
    </SafeAreaView>
  );
};

export default RiderProfileScreen;
