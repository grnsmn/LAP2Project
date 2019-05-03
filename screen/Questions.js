import Home from './Home';
import { StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import React from 'react';
import { ListItem, FormLabel, FormInput, Header} from 'react-native-elements';

export default class Questions extends React.Component {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: (
    //             <Header
    //                 centerComponent={<Button title="AppQuest" onPress = {() => navigation.navigate("Home")}/> }        
    //               />
    //         )
    //     }
    //   };

    render(){
        return(
            <View >
                <Text>HELLO WORLD</Text>
            </View>
        );
    }
}

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      //paddingTop: Constants.statusBarHeight,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });