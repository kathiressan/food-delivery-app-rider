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
import AvailableJob from "../components/JobHistory";

const DeliveryHistoryListScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex bg-[#BEDA54] h-full`}>
      <Header />
      <Text style={tw`text-white text-2xl mb-2 text-center`}>
        Delivery history
      </Text>
      <ScrollView style={tw`p-1`}>
        <TouchableOpacity>
          <AvailableJob />
        </TouchableOpacity>
        <TouchableOpacity>
          <AvailableJob />
        </TouchableOpacity>
        <TouchableOpacity>
          <AvailableJob />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryHistoryListScreen;
