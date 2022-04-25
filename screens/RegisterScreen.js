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
import { collection, addDoc, doc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState("");
  const [preferredBank, setPreferredBank] = useState("");
  const [bankAccNum, setBankAccNum] = useState("");

  const toast = useToast();
  // const accountsCol = collection(db, "accounts");
  const navigation = useNavigation();
  const accountsRef = collection(db, "accounts");

  const registerFunc = async () => {
    try {
      await addDoc(accountsRef, {
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        password: password,
        plateNumber: vehiclePlateNumber,
        bankName: preferredBank,
        bankNumber: bankAccNum,
        accountType: "Rider",
      });
      toast.show("Registration Successful!", {
        type: "success",
      });
      navigation.navigate("LoginScreen");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <SafeAreaView style={tw`bg-[#BEDA54] h-full flex items-center`}>
      <View style={tw`flex items-center`}>
        <Image
          style={[
            tw`mt-20 rounded-full`,
            { width: 100, height: 100, resizeMode: "contain" },
          ]}
          source={{
            uri: "https://thumbs.dreamstime.com/b/shopping-cart-orange-background-icon-vector-illustration-stock-80754940.jpg",
          }}
        />
        <Text style={tw`font-bold text-4xl`}>Hello</Text>
        <Text style={tw`font-bold text-lg`}>Create your account below</Text>
      </View>
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-4`}
        onChangeText={setName}
        placeholder="Name"
        value={name}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        value={phoneNumber}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setVehiclePlateNumber}
        placeholder="Vehicle plate number"
        secureTextEntry={true}
        value={vehiclePlateNumber}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setPreferredBank}
        placeholder="Preferred Bank"
        secureTextEntry={true}
        value={preferredBank}
      />
      <TextInput
        style={tw`bg-white w-[65%] p-2 border rounded-xl mt-2`}
        onChangeText={setBankAccNum}
        placeholder="Bank account number"
        secureTextEntry={true}
        value={bankAccNum}
      />
      <TouchableOpacity style={tw`w-[20%]`}>
        <Text
          style={tw`bg-gray-100 text-center border p-2 rounded overflow-hidden mt-2 mb-4`}
          onPress={registerFunc}
        >
          Register
        </Text>
      </TouchableOpacity>
      <View style={tw`flex flex-row mt-6`}>
        <Text style={tw`mr-2`}>Already have an account?</Text>
        <TouchableOpacity>
          <Text
            style={tw`text-blue-600`}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
