import React from 'react';
import { Constants } from 'expo';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as firebase from "firebase";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ListItem, FormLabel, FormInput, Header } from 'react-native-elements';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDo16nNZOdwoBMbliU04FEKB6qeNwvTlEI",
  authDomain: "esempio-ae701.firebaseapp.com",
  databaseURL: "https://esempio-ae701.firebaseio.com",
  projectId: "esempio-ae701",
  storageBucket: "esempio-ae701.appspot.com",
  messagingSenderId: "252987762819"
};
!firebase.apps.length ? firebase.initializeApp(config) : null;
console.ignoredYellowBox = [355611];
const database = firebase.database();

 class Home extends React.Component {
  state = {
    data: []
   }

  componentDidMount() {
    // leggere il nostro array proveniente da firebase
    const questionari = database.ref('Questionari');
    questionari.on('value', snap => { 
      var elenco = [];
      snap.forEach(child => {
        elenco.push({
          nome:child.key 
        });
      });
      this.setState({ data: elenco });
      console.log(this.state.data);

    });
  }

  render() {
    return (    
        <ScrollView style={styles.container}>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
          {this.state.data.map((l, i) => (
                <ListItem
                  key={i}
                  title={l.nome}
                  onPress={()=>console.log(l.nome)}
                  bottomDivider='true'
                />))}   
        </ScrollView> 
         
    );
  }
}


 const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
});

export default createAppContainer(AppNavigator);

// export default class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
