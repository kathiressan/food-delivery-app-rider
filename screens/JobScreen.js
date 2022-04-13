import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Pressable,
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
import Icon from "react-native-vector-icons/Entypo";

const JobScreen = () => {
  const jobStatus = ["Grocery Picked Up", "Arrived", "Delivered"];
  const [status, setStatus] = useState(jobStatus[0]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const changeStatus = () => {
    let idx = jobStatus.indexOf(status) + 1;
    idx = idx > 2 ? 0 : idx;
    setStatus(jobStatus[idx]);
    if (status == "Delivered") {
      setModalVisible(true);
    }
  };
  return (
    <SafeAreaView
      style={[
        tw`flex bg-[#BEDA54] h-full`,
        modalVisible ? { opacity: 0.3 } : { opacity: 1 },
      ]}
    >
      <Header />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, tw`bg-[#BEDA54] border`]}>
            <Text style={[styles.modalText, tw`text-black`]}>
              You have successfully delivered the grocery order 000001
            </Text>
            <Text style={tw`text-white`}>
              RM 8 has been credited into your wallet
            </Text>
            <TouchableOpacity
              style={tw`mt-10 bg-black p-3 rounded-md`}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("HomeScreen");
              }}
            >
              <Text style={tw`text-white`}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={tw`bg-orange-300 mb-3 p-2 rounded-xl overflow-hidden border`}
      >
        <View style={tw`items-center flex flex-row`}>
          <Icon name="location-pin" size={30} color="red" />
          <Text style={tw`text-white`}>Pickup location</Text>
        </View>
        <View style={tw`items-center flex flex-row`}>
          <Icon name="location-pin" size={30} color="green" />
          <Text style={tw`text-white`}>Drop off location</Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`ml-3 text-white`}>Order ID: 00001</Text>
          <Text style={tw`ml-3 text-white`}>Fees: rm8</Text>
        </View>
      </View>
      <View
        style={tw`bg-orange-300 mb-3 p-2 rounded-xl overflow-hidden border`}
      >
        <Text style={tw`text-white`}>Grocery List:</Text>
        <Text style={tw`text-white`}>1. Egg</Text>
        <Text style={tw`text-white`}>2. Chicken</Text>
        <Text style={tw`text-white`}>3. Carrot</Text>
        <Text style={tw`text-white`}>4. Brocolli</Text>
      </View>
      <TouchableOpacity onPress={changeStatus}>
        <Text
          style={tw`bg-green-400 p-3 border rounded-xl w-[70%] mx-auto overflow-hidden text-center mt-80`}
        >
          {status}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default JobScreen;
