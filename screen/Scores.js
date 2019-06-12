import { StyleSheet, View, Button } from "react-native";
import React from "react";
import { Text } from "react-native-elements";

var punti = 0;
export default class Scores extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Punteggi totali",
      headerStyle: {
        backgroundColor: "#f4521e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  state = {
    testo: ""
  };
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ testo: navigation.getParam("punteggio") });
  }
  render() {
    return (
      <View>
        <Text h3>Punteggio finale: {this.state.testo}</Text>
        {/* <Button style={{ width: 200 }} title="Home" /> */}
      </View>
    );
  }
}
