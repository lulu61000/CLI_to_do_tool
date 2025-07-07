import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MUSIC_DATA_KEY = '@music_data'; //key from Mymusic.js

function LocationScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    //Add state to hold all music info
    const [musicImageUri, setMusicImageUri] = useState(null);
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');

    useEffect(() => {
        (async () => {
            //Load the saved image
            try {
                const savedDataJSON = await AsyncStorage.getItem(MUSIC_DATA_KEY);
                if (savedDataJSON !== null) {
                    const savedData = JSON.parse(savedDataJSON);
                    setMusicImageUri(savedData.imageUri); // Set info
                    setSongTitle(savedData.songTitle);
                    setArtistName(savedData.artistName);
                }
            } catch (e) {
                console.log('Failed to load music data for marker.');
            }

            //permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied.');
                return;
            }

            try {
                let currentPosition = await Location.getCurrentPositionAsync({});
                setLocation(currentPosition);
            } catch (error) {
                setErrorMsg('Could not fetch location.');
            }
        })();
    }, []);

    // Loading indicator
    if (!location) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Finding your location...</Text>
            </View>
        );
    }

    // Error m
    if (errorMsg) {
        return (
            <View style={styles.centered}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={"You"}
                    description={"Listening: "+songTitle + " by: "+artistName+" JOIN NOW"}
                >
                    {/* If we have a image, display it. Otherwise the default red pin. */}
                    {musicImageUri && (
                        <Image
                            source={{ uri: musicImageUri }}
                            style={styles.markerImage}
                        />
                    )}
                </Marker>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerImage: {
        width: 50,
        height: 50,
        borderRadius: 25, // a circle
        borderWidth: 2,
        borderColor: 'white',
    },
});

export default LocationScreen;