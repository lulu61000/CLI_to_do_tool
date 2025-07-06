import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen(props) {
    const navigation = useNavigation(); // Moved hook inside the component

    return (
        <ImageBackground 
            style={styles.background}
            source={require("../assets/testb.jpg")} >
            <View style={styles.logo_container}>
                <Image style={styles.logo} source={require("../assets/music_map_icon.png")} />
                <Text style={{backgroundColor: 'gold', padding: 10, borderRadius: 5}}>Explore and expand your music atmosphere!</Text>
            </View>
            <TouchableNativeFeedback onPress={() => navigation.navigate('MyMusic')}>
                <View style={styles.mymusicbutton}>
                    <Text style={styles.buttonText}>Mymusic</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate('View')}>
                <View style={styles.gallerybutton}>
                    <Text style={styles.buttonText}>Gallery</Text>
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={() => navigation.navigate('Location')}>
                <View style={styles.locationbutton}>
                    <Text style={styles.buttonText}>Locations</Text>
                </View>
            </TouchableNativeFeedback>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems:'center',
    },
    mymusicbutton:{
        width:"100%",
        height: 70,
        backgroundColor: "#fc5c65"
    },
    gallerybutton:{
        width:"100%",
        height: 70,
        backgroundColor: "#4ecdc4"
    },
    locationbutton:{
        width:"100%",
        height: 70,
        backgroundColor: "#c62bed"
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    logo:{
        width:"50%",
        height:"400%",
        marginBottom: 10,
    },
    logo_container:{
        position:'absolute',
        top:100,
        alignItems:'center',
    },
})

export default WelcomeScreen;