import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// A key to identify data in user phone's storage
const MUSIC_DATA_KEY = '@music_data';

function Mymusic() {
    // State to hold the data
    const [imageUri, setImageUri] = useState(null);
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');

    // useEffect hook runs only once 
    useEffect(() => {
        const loadData = async () => {
            try {
                const savedDataJSON = await AsyncStorage.getItem(MUSIC_DATA_KEY);
                if (savedDataJSON !== null) {
                    const savedData = JSON.parse(savedDataJSON);
                    setImageUri(savedData.imageUri);
                    setSongTitle(savedData.songTitle);
                    setArtistName(savedData.artistName);
                }
            } catch (e) {
                Alert.alert('Failed to load data.');
            }
        };

        loadData();
        // Request permissions
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Sorry, we need camera roll permissions!');
                }
            }
        })();
    }, []); // Empty array means this runs only on the initial mount

    // runs every time the data changes
    useEffect(() => {
        const saveData = async () => {
            try {
                const dataToSave = { imageUri, songTitle, artistName };
                const dataToSaveJSON = JSON.stringify(dataToSave);
                await AsyncStorage.setItem(MUSIC_DATA_KEY, dataToSaveJSON);
            } catch (e) {
                Alert.alert('Failed to save data.');
            }
        };

        saveData();
    }, [imageUri, songTitle, artistName]); // Dependency array runs this whenever these values change

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.albumArt} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderText}>Tap to select a photo</Text>
                    </View>
                )}
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Enter Song Title"
                placeholderTextColor="#666"
                value={songTitle}
                onChangeText={setSongTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Artist Name"
                placeholderTextColor="#666"
                value={artistName}
                onChangeText={setArtistName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    albumArt: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 30,
        backgroundColor: '#333',
    },
    imagePlaceholder: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 30,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 18,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#222',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        color: '#fff',
        marginBottom: 15,
    },
});

export default Mymusic;