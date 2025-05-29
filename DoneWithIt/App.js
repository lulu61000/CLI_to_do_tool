import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Image,TouchableWithoutFeedback, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Do something!</Text>
      <TouchableWithoutFeedback onPress={() =>console.log("we clicked once")}>
        <Image  source = {{
        width:200,height:300,uri:"https://picsum.photos/200/300",
        }}/>
      </TouchableWithoutFeedback>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
