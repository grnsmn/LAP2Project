import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Questions from "./screen/Questions";
import Scores from "./screen/Scores";

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
    },
    Scores: {
      screen: Scores
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
