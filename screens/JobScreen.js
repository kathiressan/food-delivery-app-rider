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
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/Entypo";
import { useSelector, useDispatch } from "react-redux";
import { selectAccount, setAccount } from "../slices/accountSlice";

const JobScreen = ({
  route: {
    params: { item },
  },
}) => {
  const jobStatus = ["Grocery Picked Up", "Arrived", "Delivered"];
  const [status, setStatus] = useState(
    jobStatus[item.orderStatus ? jobStatus.indexOf(item.orderStatus) + 1 : 0]
  );
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const account = useSelector(selectAccount);
  const tempAccount = JSON.parse(JSON.stringify(account));
  tempAccount.totalWallet = parseFloat(tempAccount.totalWallet);
  const dispatch = useDispatch();

  const changeStatus = async () => {
    let idx = jobStatus.indexOf(status) + 1;
    idx = idx > 2 ? 0 : idx;
    setStatus(jobStatus[idx]);
    await updateDoc(doc(db, "orders", item.id), {
      orderStatus: status,
      riderID: account.id,
    });
    if (status == "Grocery Picked Up") {
      toast.show("Order has been picked up!", {
        type: "success",
      });
    }
    if (status == "Arrived") {
      toast.show("You have arrived at delivery location", {
        type: "success",
      });
    }
    if (status == "Delivered") {
      const riderID = item.riderID;
      const walletBalance =
        parseFloat(tempAccount.totalWallet) + parseFloat(item.deliveryFee);
      tempAccount.totalWallet = walletBalance;
      dispatch(setAccount(tempAccount));
      await updateDoc(doc(db, "accounts", account.id), {
        totalWallet: walletBalance,
      });
      toast.show("Order has been delivered!", {
        type: "success",
      });
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
              {`You have successfully delivered the grocery order ${item.id}`}
            </Text>
            <Text style={tw`text-white`}>
              {`RM ${item.deliveryFee} has been credited into your wallet`}
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
          <Text style={tw`text-white`}>{item.pickupAddress}</Text>
        </View>
        <View style={tw`items-center flex flex-row`}>
          <Icon name="location-pin" size={30} color="green" />
          <Text style={tw`text-white`}>{item.deliveryAddress}</Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`ml-3 text-white`}>{`Order ID: ${item.id}`}</Text>
          <Text
            style={tw`ml-3 text-white`}
          >{`Fees: RM${item.deliveryFee}`}</Text>
        </View>
      </View>
      <View
        style={tw`bg-orange-300 mb-3 p-2 rounded-xl overflow-hidden border`}
      >
        {item.items.map((prod, index) => (
          <Text key={index} style={tw`text-white`}>{`${index + 1}. ${
            prod.productName
          }`}</Text>
        ))}
        {/* <Text style={tw`text-white`}>Grocery List:</Text>
        <Text style={tw`text-white`}>1. Egg</Text>
        <Text style={tw`text-white`}>2. Chicken</Text>
        <Text style={tw`text-white`}>3. Carrot</Text>
        <Text style={tw`text-white`}>4. Brocolli</Text> */}
      </View>
      <TouchableOpacity onPress={changeStatus}>
        <Text
          style={tw`bg-green-400 p-3 border rounded-xl w-[70%] mx-auto overflow-hidden text-center mt-70`}
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
