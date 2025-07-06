import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function LocationScreen() {
    // State to hold location object and any error messages
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied.');
                Alert.alert(
                    'Permission Denied',
                    'To use this feature, you must enable location services for this app in your phone settings.',
                    [{ text: 'OK' }]
                );
                return;
            }

            // check location
            try {
                let currentPosition = await Location.getCurrentPositionAsync({});
                setLocation(currentPosition);
            } catch (error) {
                setErrorMsg('Could not fetch location.');
                Alert.alert('Error', 'Could not fetch your location. Please try again later.');
            }
        })();
    }, []);

    if (!location && !errorMsg) {//loading icon
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Finding your location...</Text>
            </View>
        );
    }

    if (errorMsg) {//error
        return (
            <View style={styles.centered}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    return (//map
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01, // zoom level
                    longitudeDelta: 0.01,
                }}
            >
                {/* Add marker at the user's exact location */}
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title={"You are here"}
                    description={"This is your current location"}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject, //fill the entire screen
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LocationScreen;