import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

const RiderDetail = ({ field, detail }) => {
  return (
    <View style={tw`flex flex-row justify-between mb-2`}>
      <View style={tw`flex flex-row`}>
        <Text style={tw`mr-2`}>{`${field}: `}</Text>
        <Text>{detail}</Text>
      </View>
      <Text style={tw`text-blue-500`}>change</Text>
    </View>
  );
};

export default RiderDetail;
