import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import VideoHorizontalListComponent from "@/components/ListComponent/VideoHorizontalListComponent"
import ScreenWrapper from '@/components/ScreenWrapper';
import Icon from 'react-native-vector-icons/Ionicons';

const topRow = [
  {image: require("@/assets/images/example_video/top_row/1.jpeg"),
    name: "Princess Dip",
    difficulty: 2,
    xp: 100,
    locked: false,
    xp_color: '#54c45e'
  }, 
  {image: require("@/assets/images/example_video/top_row/2.jpeg"),
    name: "Head Whip",
    difficulty: 3,
    xp: 100,
    locked: true,
    xp_color: '#54c45e'
  }, 
  {image: require("@/assets/images/example_video/top_row/3.jpeg"),
    name: "I See Country",
    difficulty: 2,
    xp: 100,
    locked: true,
    xp_color: '#54c45e'
  }, 
  {image: require("@/assets/images/example_video/top_row/4.jpeg"),
    name: "Make it Shake",
    difficulty: 4,
    xp: 100,
    locked: true,
    xp_color: '#54c45e'
  }, 
];

const bottomRow = [
  {image: require("@/assets/images/example_video/bottom_row/1.jpeg"),
    name: "The Wolf",
    difficulty: 2,
    xp: 50,
    locked: false,
    xp_color: '#1071e5'
  }, 
  {image: require("@/assets/images/example_video/bottom_row/2.jpeg"),
    name: "Toe Pop",
    difficulty: 3,
    xp: 75,
    locked: false,
    xp_color: '#1071e5'
  }, 
  {image: require("@/assets/images/example_video/bottom_row/3.jpeg"),
    name: "Open Dip",
    difficulty: 2,
    xp: 50,
    locked: false,
    xp_color: '#1071e5'
  }, 
  {image: require("@/assets/images/example_video/bottom_row/4.jpeg"),
    name: "Make it Shake",
    difficulty: 4,
    xp: 100,
    locked: false,
    xp_color: '#1071e5'
  }, 
];

const learn = () => {
  
  return (
    <ScreenWrapper bg='white'>
      <View style={styles.container}>
        <Text style={styles.titles}>Learn</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          >
            {[...Array(4)].map((_,index) => (
              <View key={index}>
                <VideoHorizontalListComponent 
                thumbnail={topRow[index].image} 
                name = {topRow[index].name}
                difficulty={topRow[index].difficulty}
                xp={topRow[index].xp}
                locked={topRow[index].locked}
                xpColor={topRow[index].xp_color}/>
              </View>
            ))}
        </ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20}}>
          <Text style={styles.titles}>Discover</Text>
          <Icon name="search" size={30} color="#000" />
        </View>
        
        {/* Search Bar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          >
            {[...Array(4)].map((_,index) => (
              <View key={index} >
                <VideoHorizontalListComponent 
                thumbnail={bottomRow[index].image} 
                name = {bottomRow[index].name}
                difficulty={bottomRow[index].difficulty}
                xp={bottomRow[index].xp}
                locked={bottomRow[index].locked}
                xpColor={bottomRow[index].xp_color}/>
              </View>
            ))}
        </ScrollView>
        <Text style={styles.titles}>Unlock At Level 2</Text>
        <Text style={styles.titles}>Unlock At Level 3</Text>
      </View> 
    </ScreenWrapper>
  )
}

export default learn

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  titles: {
    fontSize: 25, 
    fontWeight: 'bold'
  },
  scrollContainer: {
    gap: 10
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    marginRight: 20
  },
});

