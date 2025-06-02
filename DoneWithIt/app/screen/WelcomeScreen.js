import React from 'react';
import { ImageBackground, StyleSheet,View, Image,Text } from 'react-native';

function WelcomeScreen(props) {
    return (
        <ImageBackground 
        style={styles.background}
        source={require("../assets/testb.jpg")} >
            <View style={styles.logo_container}>
                <Image style={styles.logo} source ={require("../assets/icon.png")} ></Image>
                <Text style={{backgroundColor: 'gold'}}>Sell used items Today!</Text>
            </View>
            <View style={styles.loginbutton}></View>
            <View style={styles.registerbutton}></View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems:'center',
    },
    loginbutton:{
        width:"100%",
        height: 70,
        backgroundColor: "#fc5c65"
    },
    registerbutton:{
        width:"100%",
        height: 70,
        backgroundColor: "#4ecdc4"
    },
    logo:{
        width:100,
        height:100,
    },
    logo_container:{
        position:'absolute',
        top:100,
        alignItems:'center',
    },
})
export default WelcomeScreen;