import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfileImage = ({ source, size = 100, style = {} }) => {
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <Image 
        source={source} 
        style={styles.image} 
        resizeMode="cover" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden', // Ensures the image stays within the circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',  
    height: '100%',
  }
});

export default ProfileImage;