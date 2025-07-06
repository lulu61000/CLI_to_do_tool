import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

function Mymusic(props) {
    return (
        <View style={styles.container}>
            <Image
                style={styles.albumArt}
                source={{ uri: 'https://picsum.photos/seed/picsum/300/300' }}
            />
            <Text style={styles.titleText}>Song Title</Text>
            <Text style={styles.artistText}>Artist Name</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Black
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumArt: {
        width: 300,
        height: 300,
        borderRadius: 15, //rounded corners image
        marginBottom: 20,
    },
    titleText: {
        color: '#fff', // White
        fontSize: 22,
        fontWeight: 'bold',
    },
    artistText: {
        color: '#ccc', //Light gray
        fontSize: 18,
    }
});

export default Mymusic;