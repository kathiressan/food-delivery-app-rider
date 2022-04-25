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
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import Header from "../components/Header";
import AvailableJob from "../components/AvailableJob";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";

const JobsListScreen = () => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs([]);
    async function getJobs() {
      const q = query(
        collection(db, "orders"),
        where("orderStatus", "==", "PENDING_PICKUP")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        try {
          const docObj = doc.data();
          docObj.id = doc.id;
          setJobs((oldArray) => [...oldArray, docObj]);
        } catch (err) {}
      });
    }
    getJobs();
  }, []);

  return (
    <SafeAreaView style={tw`flex bg-[#BEDA54] h-full`}>
      <Header />
      <ScrollView style={tw`p-1`}>
        {jobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            onPress={() => {
              navigation.navigate("JobScreen", { item: job });
            }}
          >
            <AvailableJob
              pickupLocation={job.pickupAddress}
              dropOffLocation={job.deliveryAddress}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsListScreen;
