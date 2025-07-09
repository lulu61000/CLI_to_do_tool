import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

const MUSIC_DATA_KEY = '@music_data';//key from Mymusic.js
const LOCATION_HISTORY_KEY = '@location_history';

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) { // distance check
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function LocationScreen() {
    //Add state to hold all info
    const [location, setLocation] = useState(null);
    const [musicImageUri, setMusicImageUri] = useState(null);
    const [songTitle, setSongTitle] = useState('');
    const [artistName, setArtistName] = useState('');
    const [locationHistory, setLocationHistory] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                //Load the saved image
                const savedDataJSON = await AsyncStorage.getItem(MUSIC_DATA_KEY);
                if (savedDataJSON !== null) {
                    const savedData = JSON.parse(savedDataJSON);
                    setMusicImageUri(savedData.imageUri); // Set info
                    setSongTitle(savedData.songTitle);
                    setArtistName(savedData.artistName);
                }

                const savedLocationHistory = JSON.parse(await AsyncStorage.getItem(LOCATION_HISTORY_KEY));
                if (savedLocationHistory) {
                    const now = Date.now();
                    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
                    const recentHistory = savedLocationHistory.filter(
                        (loc) => loc.timestamp > twentyFourHoursAgo
                    );
                    setLocationHistory(recentHistory);
                }
            } catch (e) {
                console.log('Failed to load data from storage.');
            }
            //permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied.');
                return;
            }

            try {
                let currentPosition = await Location.getCurrentPositionAsync({});
                setLocation(currentPosition);
            } catch (error) {
                Alert.alert('Could not fetch location.');
            }
        })();
    }, []);
 // Loading hsitory locations
    useEffect(() => {
        if (location) {
            const lastLocation = locationHistory.length > 0 ? locationHistory[locationHistory.length - 1] : null;
            let shouldSaveNewLocation = true;

            if (lastLocation) {
                const distance = getDistanceFromLatLonInKm(
                    lastLocation.latitude,
                    lastLocation.longitude,
                    location.coords.latitude,
                    location.coords.longitude
                );
                if (distance <= 1) {
                    shouldSaveNewLocation = false;
                }
            }

            if (shouldSaveNewLocation) {
                const newLocationRecord = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    timestamp: location.timestamp,
                    deviceId: Device.osInternalBuildId,
                };

                const updatedHistory = [...locationHistory, newLocationRecord];
                setLocationHistory(updatedHistory);
                AsyncStorage.setItem(LOCATION_HISTORY_KEY, JSON.stringify(updatedHistory));
            }
        }
    }, [location]);

    if (!location) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Finding your location...</Text>
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
                {locationHistory.map((historicalLocation) => (
                    <Marker
                        key={historicalLocation.timestamp}
                        coordinate={historicalLocation}
                        pinColor="tan"
                        title={`Visited at ${new Date(historicalLocation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    />
                ))}

                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={"You"}
                    description={"Listening: " + songTitle + " by: " + artistName + " JOIN NOW"}
                >
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