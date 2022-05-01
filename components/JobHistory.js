import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Entypo";

const AvailableJob = ({
  pickupLocation,
  dropoffLocation,
  orderID,
  deliveryFee,
  status,
}) => {
  return (
    <View style={tw`bg-orange-300 mb-3 p-2 rounded-xl overflow-hidden border`}>
      <View style={tw`items-center flex flex-row`}>
        <Icon name="location-pin" size={30} color="red" />
        <Text style={tw`text-white`}>{pickupLocation}</Text>
      </View>
      <View style={tw`items-center flex flex-row`}>
        <Icon name="location-pin" size={30} color="green" />
        <Text style={tw`text-white`}>{dropoffLocation}</Text>
      </View>
      <View style={tw`flex flex-row justify-between`}>
        <Text style={tw`ml-3 text-white`}>{`Order ID: ${orderID}`}</Text>
        <Text style={tw`ml-3 text-white`}>{`Fees: RM${deliveryFee}`}</Text>
      </View>
      {status != "Delivered" && (
        <View>
          <Text style={tw`ml-3 text-red-500`}>Pending Delivery</Text>
        </View>
      )}
    </View>
  );
};

export default AvailableJob;
