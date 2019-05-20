// implementare grafica questionario
import { StyleSheet, View, ScrollView, Button } from "react-native";
import React from "react";
import * as firebase from "firebase";
import { Text, CheckBox } from "react-native-elements";
import UserAppQuest from "./Login";
const database = firebase.database();
var test = "";
// secondo database per memorizzazione utenti

console.log("nome database" + UserAppQuest.name);
export default class Questions extends React.Component {
  state = {
    data: [],
    flagComplete: false
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("scelta"),
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    };
  };
  componentDidMount() {
    const { navigation } = this.props;
    test = navigation.getParam("scelta");
    // leggere array proveniente da database AppQuestionari
    const questionari = database.ref(
      "Questionari/" + navigation.getParam("scelta")
    );
    questionari.on("value", snap => {
      var elenco = [];
      snap.forEach(child => {
        elenco.push({
          domanda: child.child("DOMANDA").val(),
          a: { testo: child.child("A").val(), check: false },
          b: { testo: child.child("B").val(), check: false },
          c: { testo: child.child("C").val(), check: false },
          d: { testo: child.child("D").val(), check: false },
          esatta: child.child("ESATTA").val()
        });
      });
      this.setState({ data: elenco, flagComplete: false });
      // console.log(this.state.data);
    });
  }
  updateFlag = () => {
    var score = 0;
    this.setState({ flagComplete: true });
    console.log(test);
    this.state.data.map((l, i) => {
      l.a.check && l.a.testo == l.esatta ? (score += 1) : (score = score);
      l.b.check && l.b.testo == l.esatta ? (score += 1) : (score = score);
      l.c.check && l.c.testo == l.esatta ? (score += 1) : (score = score);
      l.d.check && l.d.testo == l.esatta ? (score += 1) : (score = score);
      console.log("score: " + score);
    });
  };
  onUpdateItem = (risp, i) => {
    this.setState(state => {
      const data = state.data.map((item, j) => {
        if (j == i) {
          switch (risp) {
            case 1:
              return (newItem = {
                domanda: item.domanda,
                esatta: item.esatta,
                a: { testo: item.a.testo, check: !item.a.check },
                b: {
                  testo: item.b.testo,
                  check: item.b.check ? !item.b.check : item.b.check
                },
                c: {
                  testo: item.c.testo,
                  check: item.c.check ? !item.c.check : item.c.check
                },
                d: {
                  testo: item.d.testo,
                  check: item.d.check ? !item.d.check : item.d.check
                }
              });
            case 2:
              return (newItem = {
                domanda: item.domanda,
                esatta: item.esatta,
                a: {
                  testo: item.a.testo,
                  check: item.a.check ? !item.a.check : item.a.check
                },
                b: { testo: item.b.testo, check: !item.b.check },
                c: {
                  testo: item.c.testo,
                  check: item.c.check ? !item.c.check : item.c.check
                },
                d: {
                  testo: item.d.testo,
                  check: item.d.check ? !item.d.check : item.d.check
                }
              });
            case 3:
              return (newItem = {
                domanda: item.domanda,
                esatta: item.esatta,
                a: {
                  testo: item.a.testo,
                  check: item.a.check ? !item.a.check : item.a.check
                },
                b: {
                  testo: item.b.testo,
                  check: item.b.check ? !item.b.check : item.b.check
                },
                c: { testo: item.c.testo, check: !item.c.check },
                d: {
                  testo: item.d.testo,
                  check: item.d.check ? !item.c.check : item.c.check
                }
              });
            case 4:
              return (newItem = {
                domanda: item.domanda,
                esatta: item.esatta,
                a: {
                  testo: item.a.testo,
                  check: item.a.check ? !item.a.check : item.a.check
                },
                b: {
                  testo: item.b.testo,
                  check: item.b.check ? !item.b.check : item.b.check
                },
                c: {
                  testo: item.c.testo,
                  check: item.c.check ? !item.c.check : item.c.check
                },
                d: { testo: item.d.testo, check: !item.d.check }
              });
          }
        }
        return item;
      });

      return {
        data
      };
    });
  };

  render() {
    return (
      <ScrollView style={styles2.container}>
        {this.state.data.map((l, i) =>
          this.state.flagComplete ? (
            <View>
              <Text h3>{l.domanda}</Text>
              <CheckBox
                center
                title={l.a.testo}
                checked={l.a.check}
                containerStyle={
                  l.a.check
                    ? l.esatta == l.a.testo
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "red" }
                    : { backgroundColor: "white" }
                }
              />
              <CheckBox
                center
                title={l.b.testo}
                checked={l.b.check}
                containerStyle={
                  l.b.check
                    ? l.esatta == l.b.testo
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "red" }
                    : { backgroundColor: "white" }
                }
              />
              <CheckBox
                center
                title={l.c.testo}
                checked={l.c.check}
                containerStyle={
                  l.c.check
                    ? l.esatta == l.c.testo
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "red" }
                    : { backgroundColor: "white" }
                }
              />
              <CheckBox
                center
                title={l.d.testo}
                checked={l.d.check}
                containerStyle={
                  l.d.check
                    ? l.esatta == l.d.testo
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "red" }
                    : { backgroundColor: "white" }
                }
              />
            </View>
          ) : (
            <View>
              <Text h3>{l.domanda}</Text>
              <CheckBox
                center
                title={l.a.testo}
                checked={l.a.check}
                onPress={() => this.onUpdateItem(1, i)}
              />
              <CheckBox
                center
                title={l.b.testo}
                checked={l.b.check}
                onPress={() => this.onUpdateItem(2, i)}
              />
              <CheckBox
                center
                title={l.c.testo}
                checked={l.c.check}
                onPress={() => this.onUpdateItem(3, i)}
              />
              <CheckBox
                center
                title={l.d.testo}
                checked={l.d.check}
                onPress={() => this.onUpdateItem(4, i)}
              />
            </View>
          )
        )}
        <Button title="Completato!" onPress={() => this.updateFlag()} />
      </ScrollView>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
    //paddingTop: Constants.statusBarHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  }
});
