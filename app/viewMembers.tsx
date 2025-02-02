import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, Pressable, TextInput } from 'react-native-gesture-handler';
import ScreenWrapper from '@/components/ScreenWrapper';
import { useRouter } from 'expo-router';
import MemberSearchListComponent from '../components/ListComponent/MemberSearchListComponent';

const membersData = [
    { id: "1", name: "Alice Johnson" },
    { id: "2", name: "Bob Smith" },
    { id: "3", name: "Charlie Brown" },
    { id: "4", name: "David White" },
    { id: "5", name: "Emma Davis" },
    { id: "6", name: "Frank Wilson" }
  ];
  
  const manageMemberships = () => {
    const [searchText, setSearchText] = useState("");
    const [filteredMembers, setFilteredMembers] = useState<{ id: string; name: string }[]>([]);
    const router = useRouter();

    // Sort members alphabetically
    useEffect(() => {
      const sortedMembers = [...membersData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFilteredMembers(sortedMembers);
    }, []);
  
    // Filter members based on search input
    useEffect(() => {
      const filtered = membersData
        .filter(member =>
          member.name.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredMembers(filtered);
    }, [searchText]);
  
    return (
      <ScreenWrapper bg='white'>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable onPress={()=>{router.back()}}>
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            {/* Search Bar */}
            <TextInput
              style={styles.searchBar}
              placeholder="Search members..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <Pressable onPress={()=>{router.push('/addMember')}}>
              <Text style={{paddingLeft: 10}}>Add</Text>
            </Pressable>
            
          </View>
    
          {/* Member List */}
          <FlatList
            data={filteredMembers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <MemberSearchListComponent name={item.name} size={60} />
            }
          />
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
    header: {
      flexDirection: 'row',
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

