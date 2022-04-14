import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
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
import WalletButton from "../components/WalletButton";

const WalletBalanceScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex bg-[#BEDA54] h-full`}>
      <Header />
      <Text style={tw`text-white text-xl text-center`}>Wallet Balance</Text>
      <View style={tw`p-4 pl-20 pr-20`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-white text-lg`}>Total collected: </Text>
          <Text style={tw`text-white text-lg`}>RM 48.90</Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-white text-lg`}>Total wallet: </Text>
          <Text style={tw`text-white text-lg`}>RM 48.90</Text>
        </View>
      </View>
      <TouchableOpacity style={tw`w-[40%] text-center mx-auto`}>
        <WalletButton text={"Top up wallet"} />
      </TouchableOpacity>
      <TouchableOpacity style={tw`w-[40%] text-center mx-auto`}>
        <WalletButton text={"Cash out wallet"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default WalletBalanceScreen;
