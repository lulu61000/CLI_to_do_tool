import React from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook library

function ViewImageScreen(props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../assets/white_wall.jpg")} resizeMode="contain" />
        </View>
    );
}

const styles = StyleSheet.create({
    closeIcon:{
        width: 50,
        height: 50,
        backgroundColor: "#fc5c65",
        position: 'absolute',
        top: 40,
        left: 30,
    },
    deleteIcon:{
        width: 50,
        height: 50,
        backgroundColor: "#4ecdc4",
        position: 'absolute',
        top: 40,
        right: 30,
    },
    container:{
        backgroundColor: "#000",
        flex: 1,
    },
    image:{
        width: "100%",
        height: "100%",
    },
});

export default ViewImageScreen;