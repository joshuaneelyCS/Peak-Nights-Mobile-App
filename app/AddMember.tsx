import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, TextInput } from "react-native-gesture-handler";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import MemberAddListComponent from "../components/ListComponent/MemberAddListComponent";
import { server } from "@/constants/serverConnection";

const API_URL = `http://${server.port}:5001/members/searchUsersNotInMembers`; // ✅ Updated API URL

const AddMember = () => {
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Fetch users NOT in members when the component mounts
  useEffect(() => {
    fetchUsersNotInMembers();
  }, []);

  // ✅ Fetch users based on search input
  useEffect(() => {
    fetchUsersNotInMembers(searchText);
  }, [searchText]);

  // ✅ Function to fetch users not in members
  const fetchUsersNotInMembers = async (query = "") => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?search=${query}`);
      const data = await response.json();
      setMembers(data); // Assume API returns an array of { id, name }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search users..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* ✅ Show Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MemberAddListComponent name={item.name} id={item.id} size={60} />}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default AddMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    height: 50,
  },
  backButtonText: {
    paddingRight: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingLeft: 10,
    marginBottom: 10,
  },
});