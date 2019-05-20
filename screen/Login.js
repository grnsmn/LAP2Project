import * as firebase from "firebase";
import React from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

// secondo database per memorizzazione utenti
var UserFirebaseConfig = {
  apiKey: "AIzaSyCfHTEot6aznoDu_aNF6xElHM-6hetNsJs",
  authDomain: "userappquest.firebaseapp.com",
  databaseURL: "https://userappquest.firebaseio.com",
  projectId: "userappquest",
  storageBucket: "userappquest.appspot.com",
  messagingSenderId: "702984912073",
  appId: "1:702984912073:web:2580d48a25d82d63"
};
//!firebase.apps.length ? firebase.initializeApp(config) : null;

export const UserAppQuest = firebase.initializeApp(
  UserFirebaseConfig,
  "UserAppQuest"
);

// console.log("nome database" + UserAppQuest.name);

export default class Login extends React.Component {
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
    isLoading: false,
    email: "NOME@MAIL.COM",
    password: "PASS",
    nome: "",
    cognome: "",
    matricola: "",
    error: "",
    data: ""
  };

  _save = () => {
    var data = new Date();
    const newUser = {
      nome: this.state.nome,
      cognome: this.state.cognome,
      matricola: this.state.matricola,
      data: data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear(),
      ora: data.getTime()
    };
    console.log(newUser);
    UserAppQuest.database()
      .ref("utenti")
      .push(newUser);
  };

  _signUp = () => {
    this.setState({ isLoading: true });
    UserAppQuest.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        this._save();
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
        alert(error.message);
      });
  };
  _logIn = () => {
    this.setState({ isLoading: true });
    UserAppQuest.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password) //modificare con la relativa per il LOGINq<<<<<<<<
      .then(user => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate("Home");
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
          onChangeText={text => this.setState({ email: text })}
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
