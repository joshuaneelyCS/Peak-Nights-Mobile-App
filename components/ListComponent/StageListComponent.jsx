import { Pressable, StyleSheet, Text, View, FlatList, Animated, Easing } from 'react-native';
import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const StageListComponent = ({ stage /*videos*/ }) => {
const [expanded, setExpanded] = useState(false);
const animation = useRef(new Animated.Value(0)).current; // Animation value
const videos = ["one", "two", "three"]
  
    const toggleExpand = () => {
      const finalValue = expanded ? 0 : 1;
  
      Animated.timing(animation, {
        toValue: finalValue,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
  
      setExpanded(!expanded);
    };
  
    // Interpolating height & opacity
    const heightInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, videos.length * 40 + 60], // Adjust height dynamically
    });
  
    const opacityInterpolation = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  
    return (
      <View style={styles.stageContainer}>
        {/* Stage Header */}
        <View style={styles.stageItem}>
          <Text style={styles.text}>Stage {stage}</Text>
          <Pressable onPress={toggleExpand}>
            <Icon 
              name={expanded ? "chevron-up-outline" : "chevron-down-outline"} 
              size={30} 
              color="#000" 
            />
          </Pressable>
        </View>
  
        {/* Animated Dropdown */}
        <Animated.View style={[styles.videoList, { height: heightInterpolation, opacity: opacityInterpolation }]}>
          <FlatList
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.videoItem}>• {item}</Text>}
          />
  
          {/* Add Video Button */}
          <Pressable style={styles.addButton} onPress={() => console.log('Add Video')}>
            <Text style={styles.addButtonText}>+ Add Video</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  };
  
  export default StageListComponent;
  
  const styles = StyleSheet.create({
    stageContainer: {
      marginBottom: 10,
      borderRadius: 10,
      overflow: "hidden",
    },
    stageItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: "#ddd",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      fontWeight: "bold",
    },
    videoList: {
      backgroundColor: "#f9f9f9",
      paddingHorizontal: 10,
      borderRadius: 10,
      marginTop: 5,
      overflow: "hidden",
    },
    videoItem: {
      fontSize: 16,
      paddingVertical: 5,
    },
    addButton: {
      backgroundColor: "#007BFF",
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
  