import * as firebase from "firebase";
import React from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import { Input } from "react-native-elements";
import { FileSystem } from "expo";

// import * as RNFS from "react-native-fs";
var database = firebase.database(); //database principale dei questionari
// var RNFS = require("react-native-fs");
// secondo database per memorizzazione utenti
// var UserFirebaseConfig = {
//   apiKey: "AIzaSyCfHTEot6aznoDu_aNF6xElHM-6hetNsJs",
//   authDomain: "userappquest.firebaseapp.com",
//   databaseURL: "https://userappquest.firebaseio.com",
//   projectId: "userappquest",
//   storageBucket: "userappquest.appspot.com",
//   messagingSenderId: "702984912073",
//   appId: "1:702984912073:web:2580d48a25d82d63"
// };
// //!firebase.apps.length ? firebase.initializeApp(config) : null;

// var UserAppQuest = firebase.initializeApp(UserFirebaseConfig, "UserAppQuest");
// var userDatabase = UserAppQuest.database();
// console.log("nome database" + UserAppQuest.name);

export default class Login extends React.Component {
  // async componentDidMount() {
  //   const options = { encoding: FileSystem.EncodingTypes.Base64 };
  //   var filename = FileSystem.documentDirectory + "text.json";
  //   console.log(filename);
  //   await FileSystem.writeAsStringAsync(filename, JSON.stringify(database.ref("Utenti")));
  //   var read = await FileSystem.readAsStringAsync(filename, options);
  //   console.log(read);
  // }
  static navigationOptions = {
    title: "Login",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  state = {
    utenti: database.ref("Utenti").push(),
    isLoading: false,
    id: "default",
    email: "",
    password: "",
    matricola: "",
    cognome: "",
    nome: "",
    error: ""
  };

  _save = () => {
    var data = new Date();
    this.setState({ id: this.state.utenti.key });
    const newUser = {
      id: this.state.id,
      email: this.state.email,
      nome: this.state.nome,
      cognome: this.state.cognome,
      matricola: this.state.matricola,
      data: data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear()
    };
    // var j = JSON.stringify(newUser);
    this.state.utenti.set(newUser);
    // console.log("file json creato: " + j);
  };

  _signUp = () => {
    this.setState({ isLoading: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        this._save();
        this.props.navigation.navigate("Home", {
          id: this.state.id,
          nome: this.state.nome,
          cognome: this.state.cognome
        });
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
        alert(error.message);
      });
  };
  _logIn = () => {
    this.setState({ isLoading: true });
    var user = firebase.auth().currentUser;
    const u = database.ref("Utenti");
    u.on("value", snap => {
      snap.forEach(child => {
        if (child.child("email").val() == user.email) {
          this.setState({ id: child.child("id").val() });
          this.setState({ nome: child.child("nome").val() });
          this.setState({ cognome: child.child("cognome").val() });
        }
      });
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        // this._search();
        // console.log("func lohin: " + this.state.id); //PER QUALCHE RAGIONE NON STAMPA, NON ARRIVA UPDATE ID E NON MI FA BEN AGGIORNARE UTENTE GIA REGISTRATO
        this.props.navigation.navigate("Home", {
          id: this.state.id,
          nome: this.state.nome,
          cognome: this.state.cognome
        });
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
        alert(error.message);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Input
          placeholder="Email"
          onChangeText={text => this.setState({ email: text.toLowerCase() })}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
        />
        <Input
          placeholder="Nome"
          onChangeText={text => this.setState({ nome: text })}
        />
        <Input
          placeholder="Cognome"
          onChangeText={text => this.setState({ cognome: text })}
        />
        <Input
          placeholder="Matricola"
          onChangeText={text => this.setState({ matricola: text })}
        />
        <Button
          title="REGISTRAMI"
          loading={this.state.isLoading}
          onPress={this._signUp}
        />
        <Button
          title="ACCEDI"
          loading={this.state.isLoading}
          onPress={this._logIn}
        />
      </View>
    );
  }
}
