import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { ListItem, FormLabel, FormInput, Header } from 'react-native-elements';
import Home from "./screen/Home";
import Login from "./screen/Login";
import Questions from "./screen/Questions";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Questions: {
      screen: Questions
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "Login",
    mode: "modal"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
