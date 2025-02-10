import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ScreenWrapper from "@/components/ScreenWrapper"
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { server } from '@/constants/serverConnection'
import { router } from 'expo-router';
import { AuthContext } from '@/context/authContext'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import StageListComponent from '../../../../../components/ListComponent/StageListComponent';

const API_URL_GET_STAGE_DATA = `http://${server.port}:5001/course/getStages`;
const API_URL_GET_VIDEO_IN_STAGE_DATA = `http://${server.port}:5001/course/getVideosInStages`;

const CourseOverview = () => {
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getStages();
        getVideosInStages();
        setLoading(false);
    }, []);

    const getStages = async () => {
        try {
            const response = await axios.get(API_URL_GET_STAGE_DATA, {
                params: { user_id: user.user_id }
            });
            if (response.data.success) {
                setStages(response.data.stages);
            }
        } catch (error) {
            console.log("Here's an error:", error);
        } finally {
            setLoading(false);
        }
    };

    const getVideosInStages = async () => {
        try {
            const response = await axios.get(API_URL_GET_VIDEO_IN_STAGE_DATA, {
                params: { user_id: user.user_id }
            });
            if (response.data.success) {
                setVideos(response.data.videos);
            }
        } catch (error) {
            console.log("Error fetching videos:", error);
        }
    };

    // Function to get and sort videos for a specific stage
    const getVideosForStage = (stageId) => {
        return videos
            .filter(video => video.stage_id === stageId) // Get videos for the stage
            .sort((a, b) => { // Sort: "main" videos first, then by video_order
                if (a.type === b.type) {
                    return a.video_order - b.video_order; // Sort by order
                }
                return a.type === "main" ? -1 : 1; // "main" videos first
            });
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()}>
                        <Icon name="chevron-back-outline" size={30} color="#000" />
                    </Pressable>
                    <Pressable onPress={() => {}}>
                        <Text style={styles.editText}>Edit</Text>
                    </Pressable>
                </View>

                {/* Use FlatList to display stages */}
                <FlatList
                    data={stages}
                    keyExtractor={(item) => item.stage_id.toString()}
                    renderItem={({ item }) => (
                        <StageListComponent 
                            key={item.stage_id} 
                            stage={item.stage_order} 
                            videos={getVideosForStage(item.stage_id)} // Pass sorted videos
                        />
                    )}
                    contentContainerStyle={styles.flatListContent}
                    ListEmptyComponent={<Text style={styles.noStagesText}>No stages available.</Text>}
                />
            </View>
        </ScreenWrapper>
    );
};

export default CourseOverview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    editText: {
        fontSize: 20,
        paddingRight: 10,
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    noStagesText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777',
        marginTop: 20,
    },
});