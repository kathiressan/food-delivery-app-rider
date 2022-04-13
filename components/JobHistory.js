import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Entypo";

const AvailableJob = () => {
  return (
    <View style={tw`bg-orange-300 mb-3 p-2 rounded-xl overflow-hidden border`}>
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
  );
};

export default AvailableJob;
