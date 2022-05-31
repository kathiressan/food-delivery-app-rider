import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import WalletButton from "../components/WalletButton";
import { useSelector, useDispatch } from "react-redux";
import { selectAccount, setAccount } from "../slices/accountSlice";

const WalletBalanceScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonType, setButtonType] = useState(null);
  const [amount, setAmount] = useState("");
  const account = useSelector(selectAccount);
  const tempAccount = JSON.parse(JSON.stringify(account));
  tempAccount.totalWallet = parseFloat(tempAccount.totalWallet);
  const toast = useToast();
  const dispatch = useDispatch();

  const processAmount = async () => {
    if (amount && isNaN(amount)) {
      toast.show("Amount should be a number", {
        type: "danger",
      });
    } else if (buttonType == "cash out" && amount > account.totalWallet) {
      toast.show("Cash out amount is greater than wallet balance", {
        type: "danger",
      });
    } else {
      const remainingBalance =
        buttonType == "cash out"
          ? (tempAccount.totalWallet =
              parseFloat(tempAccount.totalWallet) - parseFloat(amount))
          : (tempAccount.totalWallet =
              parseFloat(tempAccount.totalWallet) + parseFloat(amount));
      tempAccount.totalWallet = remainingBalance;
      dispatch(setAccount(tempAccount));
      await updateDoc(doc(db, "accounts", account.id), {
        totalWallet: remainingBalance,
      });
      toast.show(`Successfully ${buttonType} wallet`, {
        type: "success",
      });
      setModalVisible(false);
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <SafeAreaView style={tw`flex bg-[#BEDA54] h-full`}>
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
              {`Enter amount to ${buttonType}:`}
            </Text>
            <TextInput
              style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
              onChangeText={setAmount}
              placeholder="Enter amount"
              placeholderTextColor="black"
              value={amount}
            />
            <TouchableOpacity
              style={tw`mt-10 bg-black p-3 rounded-md`}
              onPress={processAmount}
            >
              <Text style={tw`text-white`}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={tw`text-white text-xl text-center`}>Wallet Balance</Text>
      <View style={tw`p-4 pl-20 pr-20`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-white text-lg`}>Total collected: </Text>
          <Text
            style={tw`text-white text-lg`}
          >{`RM ${account.totalCollected}`}</Text>
        </View>
        <View style={tw`flex flex-row justify-between`}>
          <Text style={tw`text-white text-lg`}>Total wallet: </Text>
          <Text
            style={tw`text-white text-lg`}
          >{`RM ${account.totalWallet}`}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={tw`w-[40%] text-center mx-auto`}
        onPress={() => {
          setButtonType("top up");
          setModalVisible(true);
        }}
      >
        <WalletButton text={"Top up wallet"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`w-[40%] text-center mx-auto`}
        onPress={() => {
          setButtonType("cash out");
          setModalVisible(true);
        }}
      >
        <WalletButton text={"Cash out wallet"} />
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

export default WalletBalanceScreen;
