import { Constants } from 'expo';
import React from 'react';
import { StyleSheet,  View, Text, ScrollView, Button  } from 'react-native';
import * as firebase from "firebase";
import { ListItem, FormLabel, FormInput, Header} from 'react-native-elements';

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

console.disableYellowBox = true;
const database = firebase.database();
console.log("nome database" + firebase.app().name);
export default class Home extends React.Component {
  state = {
    data: []
   }

  static navigationOptions = ({ navigation }) => {
    return {
        header: (
            <Header
                centerComponent={<Button title="AppQuest" onPress = {() => navigation.navigate("Login")}/> }        
              />
        )
    }
  };
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
          {this.state.data.map((l, i) => (
         <ListItem
                  key={i}
                  title={l.nome}
                  onPress={()=>this.props.navigation.navigate("Login")}
                  bottomDivider='true'
                />))}   
        </ScrollView>          
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      //paddingTop: Constants.statusBarHeight,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    header: {
        color: 'white'
    }
  });