import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const VideoHorizontalListComponent = ({ thumbnail, name, difficulty = 1, xp = 25, xpColor, locked = false }) => {
  
  const displayName = locked ? 'Locked' : name;
  const displayDifficulty = locked ? "" : `Difficulty: ${difficulty}`;
  const displayXp = locked ? "" : `+${xp} XP`;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={thumbnail} style={styles.image} resizeMode="cover" />
        {locked && <View style={styles.overlay} />}
      </View>
      <View style={{ alignItems: 'flex-start' }}>
        <Text style={[styles.name, locked && styles.lockedText]}>{displayName}</Text>
        <Text style={styles.difficulty}>{displayDifficulty}</Text>
        <Text style={[styles.xp, {color: xpColor}]}>{displayXp}</Text>
      </View>
    </View>
  )
}

export default VideoHorizontalListComponent

const styles = StyleSheet.create({
  container: {
    width: 100, // Ensure it fits inside the parent container
    height: 260, // Adjust height to fit your needs
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",  
    height: 180, // Adjust height for a better layout
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,  // Covers the entire image
    backgroundColor: "rgba(206, 212, 219, 0.62)",  // Semi-transparent gray
    borderRadius: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    color: "#000",
  },
  lockedText: {
    color: "#A9A9A9", // Light gray text when locked
  },
  difficulty: {
    fontSize: 12,
    marginTop: 2,
    color: "#000",
  },
  xp: {
    fontSize: 12,
    marginTop: 2,
    color: "#000",
  },
});