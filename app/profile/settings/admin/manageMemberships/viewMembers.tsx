import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Pressable, TextInput } from 'react-native-gesture-handler';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useFocusEffect, useRouter } from 'expo-router';
import MemberSearchListComponent from '../../../../../components/ListComponent/MemberSearchListComponent';
import { server } from '@/constants/serverConnection';
import { theme } from '@/constants/theme';

const API_URL = `http://${server.port}:5001/members/searchMembers`;

  const manageMemberships = () => {
    const [searchText, setSearchText] = useState("");
    const [members, setMembers] = useState<{ id: string; name: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useFocusEffect(
      useCallback(() => {
          console.log("🔄 Reloading user data...");
          fetchMembers(searchText); // ✅ Ensures fresh data is loaded
      }, [])
    );

    // ✅ Fetch users NOT in members when the component mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  // ✅ Fetch users based on search input
  useEffect(() => {
    fetchMembers(searchText);
  }, [searchText]);

  // ✅ Function to fetch users not in members
  const fetchMembers = async (query = "") => {
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
      <ScreenWrapper bg='white'>
        <View style={styles.container}>
          <View style={styles.header}>

            <View style={styles.title}>
              <Pressable onPress={()=>{router.back()}}>
                <Text style={styles.backButtonText}>Back</Text>
              </Pressable>
              <Text style={{fontWeight: 'bold', fontSize: 25}}>Members</Text>
            </View>

            <Pressable onPress={()=>{router.push('/profile/settings/admin/manageMemberships/AddMember')}}>
              <Text style={{paddingLeft: 10}}>Add</Text>
            </Pressable>

          </View>

          <View style={styles.searchRow}>
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              placeholder="Search members..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
    
          {/* Member List */}
          {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <FlatList
            data={members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MemberSearchListComponent name={item.name} id={item.id} size={60} />}
          />
        )}
        </View>
      </ScreenWrapper>
    );
  };

  export default manageMemberships
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingHorizontal: 20,
      backgroundColor: "#fff"
    },
    title: {
      flexDirection: 'row',
    },
    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      height: 40,
    },
    searchRow: {
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
      marginBottom: 10
    },
  });

