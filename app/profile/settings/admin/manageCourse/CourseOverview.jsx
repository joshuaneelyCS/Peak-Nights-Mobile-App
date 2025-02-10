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

const CourseOverview = () => {
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getStages();
    }, []);

    const getStages = async () => {
        try {
            const response = await axios.get(API_URL_GET_STAGE_DATA, {
                params: {
                    user_id: user.user_id
                }
            });
            if (response.data.success) {
                setStages(response.data.stage_ids);
            }
        } catch (error) {
            console.log("Here's an error:", error);
        } finally {
            setLoading(false);
        }
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

                {/* Replace ScrollView with FlatList */}
                <FlatList
                    data={stages}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                        <StageListComponent key={item} stage={item} />
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