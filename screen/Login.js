import * as firebase from "firebase";
import React from 'react';
import { StyleSheet,  View, Text, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
var config = {
    apiKey: "AIzaSyDo16nNZOdwoBMbliU04FEKB6qeNwvTlEI",
    authDomain: "esempio-ae701.firebaseapp.com",
    databaseURL: "https://esempio-ae701.firebaseio.com",
    projectId: "esempio-ae701",
    storageBucket: "esempio-ae701.appspot.com",
    messagingSenderId: "252987762819"
  };
  !firebase.apps.length ? firebase.initializeApp(config) : null;

export default class Login extends React.Component{
    static navigationOptions = {
        title: "Login"
      }
      state = {
        isLoading: false,
        email: "pippo@mail.com",
        password: "pippo1234",
        error: ""
      };

      _signUp = () => {
        this.setState({ isLoading: true });
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(user => {
            this.setState({ isLoading: false });
            console.log(user);
            this.props.navigation.navigate("Home");
          })
          .catch(error => {
            this.setState({ isLoading: false, error: error.message });
            //alert(error.message);
          });
      };

    render(){
        return(
            <View style={{flex:1}}>
                    <Input placeholder='Email'onChangeText={text => this.setState({ email: text })}/>
                    <Input placeholder='Nome' />
                    <Input placeholder='Cognome'/>
                    <Input placeholder='Matricola' onChangeText={text => this.setState({ password: text })}/>
                    <Button title="AVANTI" loading={this.state.isLoading} onPress={this._signUp}/>
            </View>
        );
    }
} 
