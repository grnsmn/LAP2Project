import * as firebase from "firebase";
import React from "react";
import { View, Button } from "react-native";
import { Input } from "react-native-elements";

var database = firebase.database(); //database principale dei questionari

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
    this.setState({ id: this.state.utenti.key });
    const newUser = {
      id: this.state.id,
      email: this.state.email,
      nome: this.state.nome,
      cognome: this.state.cognome,
      matricola: this.state.matricola,
      data:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getFullYear()
    };
    this.state.utenti.set(newUser);
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
          placeholder="Email*"
          onChangeText={text => this.setState({ email: text.toLowerCase() })}
        />
        <Input
          placeholder="Password*"
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
