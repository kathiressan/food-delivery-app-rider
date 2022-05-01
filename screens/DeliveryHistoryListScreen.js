import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "twrnc";
import { useToast } from "react-native-toast-notifications";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import AvailableJob from "../components/JobHistory";
import { useSelector } from "react-redux";
import { selectAccount } from "../slices/accountSlice";

const DeliveryHistoryListScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const account = useSelector(selectAccount);

  const pendingDeliveryScreen = (job) => {
    if (job.orderStatus != "Delivered") {
      navigation.navigate("JobScreen", { item: job });
    }
  };

  useEffect(() => {
    setJobs([]);
    async function getJobs() {
      const q = query(
        collection(db, "orders"),
        where("riderID", "==", account.id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        try {
          const docObj = doc.data();
          docObj.id = doc.id;
          setJobs((oldArray) => [...oldArray, docObj]);
          console.log("jobs", jobs);
        } catch (err) {}
      });
    }
    getJobs();
  }, []);

  return (
    <SafeAreaView style={tw`flex bg-[#BEDA54] h-full`}>
      <Header />
      <Text style={tw`text-white text-2xl mb-2 text-center`}>
        Delivery history
      </Text>
      <ScrollView style={tw`p-1`}>
        {jobs.length > 0 &&
          jobs.map((job) => (
            <TouchableOpacity
              key={job.id}
              onPress={() => {
                pendingDeliveryScreen(job);
              }}
            >
              <AvailableJob
                pickupLocation={job.pickupAddress}
                dropoffLocation={job.deliveryAddress}
                orderID={job.id}
                deliveryFee={job.deliveryFee}
                status={job.orderStatus}
              />
              {/* <Text>{job.pickupAddress}</Text> */}
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryHistoryListScreen;
