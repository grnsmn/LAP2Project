import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import * as firebase from "firebase";
import { ListItem } from "react-native-elements";
console.disableYellowBox = true;

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

const database = firebase.database();

var currentUser = {
  nome: "",
  cognome: "",
  id: ""
};

// console.log("nome database" + firebase.app().name);
export default class Home extends React.Component {
  state = {
    data: []
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
      headerStyle: {
        backgroundColor: "#f4521e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  componentDidMount() {
    // leggere il nostro array proveniente da firebase
    const questionari = database.ref("Questionari");
    const { navigation } = this.props;
    currentUser.id = navigation.getParam("id");
    currentUser.nome = navigation.getParam("nome");
    currentUser.cognome = navigation.getParam("cognome");

    questionari.on("value", snap => {
      var elenco = [];
      snap.forEach(child => {
        elenco.push({
          nome: child.key
        });
      });
      this.setState({ data: elenco });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.data.map((l, i) => (
          <ListItem
            key={i}
            title={l.nome}
            onPress={() =>
              this.props.navigation.navigate("Questions", {
                scelta: l.nome,
                currentUser: currentUser
              })
            }
            bottomDivider="true"
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    //paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    color: "white"
  }
});
