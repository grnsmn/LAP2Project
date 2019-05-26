// implementare grafica questionario
import { StyleSheet, View, ScrollView, Button } from "react-native";
import React from "react";
import * as firebase from "firebase";
import { Text, CheckBox } from "react-native-elements";

const database = firebase.database(); //database principale dei questionari
var testScelto = ""; //Per la memorizzazione del nome del test scelto
var scores = 0;
var idUser = "";
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
    const { navigation } = this.props; //Utile a ricevere prop dalla screen Home (scelta teste e id user)
    testScelto = navigation.getParam("scelta");
    idUser = navigation.getParam("currentUser");

    var user = firebase.auth().currentUser;
    const questionari = database.ref(
      //punta al ramo JSON della lista questionari
      "Questionari/" + testScelto
    );
    // const utenti = database.ref("Utenti"); //punta al ramo JSON  degli utenti che completano i test
    // utenti.on("value", snap => {
    //   // console.log(snap.child().key);
    //   // snap.forEach(child => {
    //   //   console.log(child.key);
    //   // });
    // });

    // leggere la lista di questionari proveniente dal database
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
    });
  }
  updateFlag = () => {
    var scoreA = 0;
    var scoreB = 0;
    var scoreC = 0;
    var scoreD = 0;
    this.setState({ flagComplete: true });
    this.state.data.map((l, i) => {
      if (l.a.check && l.a.testo == l.esatta) scoreA = 1;
      if (l.b.check && l.b.testo == l.esatta) scoreB = 1;
      if (l.c.check && l.c.testo == l.esatta) scoreC = 1;
      if (l.d.check && l.d.testo == l.esatta) scoreD = 1;
    });
    scores += scoreA + scoreB + scoreC + scoreD;

    const utenti = database.ref("Utenti/" + idUser); //punta al ramo JSON  degli utenti che completano i test
    // utenti.update({})
    utenti.on("value", snap => {
      // console.log(snap.child().val());
      snap.forEach(child => {
        console.log(child.child("id").val());
        if (child.child("id").val() == idUser) {
          console.log("corrisponde!");
        }
      });
    });
    console.log("score: " + scores);
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
        {this.state.flagComplete ? (
          <Button title="Punteggio" />
        ) : (
          <Button title="Completato!" onPress={() => this.updateFlag()} />
        )}
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
