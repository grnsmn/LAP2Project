import { StyleSheet, View, ScrollView, Button } from "react-native";
import React from "react";
import * as firebase from "firebase";
import { Text, CheckBox } from "react-native-elements";
import { FileSystem } from "expo";

const database = firebase.database(); //database principale dei questionari
var testScelto = ""; //Per la memorizzazione del nome del test scelto
var scores = 0;
var idUser = "";
var filename = "";
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
    filename =
      FileSystem.documentDirectory +
      idUser.cognome +
      idUser.nome +
      testScelto +
      ".json";
    const questionari = database.ref(
      //punta al ramo JSON della lista questionari
      "Questionari/" + testScelto
    );

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
  async WR(str) {
    // console.log(filename);
    await FileSystem.writeAsStringAsync(filename, str);
    const options = { encoding: FileSystem.EncodingTypes.Base64 };
    var read = await FileSystem.readAsStringAsync(filename, options);
    // console.log("letto dal file" + read);
  }
  updateFlag = () => {
    var array = [];
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

      if (l.a.check) {
        l.a.testo == l.esatta
          ? array.push({ risposta: "A", punti: "1" })
          : array.push({ risposta: "A", punti: "0" });
      }
      if (l.b.check) {
        l.b.testo == l.esatta
          ? array.push({ risposta: "B", punti: "1" })
          : array.push({ risposta: "B", punti: "0" });
      }
      if (l.c.check) {
        l.c.testo == l.esatta
          ? array.push({ risposta: "C", punti: "1" })
          : array.push({ risposta: "C", punti: "0" });
      }
      if (l.d.check) {
        l.d.testo == l.esatta
          ? array.push({ risposta: "D", punti: "1" })
          : array.push({ risposta: "D", punti: "0" });
      }
    });
    scores += scoreA + scoreB + scoreC + scoreD;
    var str;
    const utenti = database.ref("Utenti/" + idUser.id); //punta al ramo JSON  degli utenti che completano i test
    utenti.on("value", snap => {
      snap.forEach(child => {
        utenti.update({
          punteggio: scores,
          nome_test: testScelto,
          array: { ...array },
          ora: new Date().getHours() + ":" + new Date().getMinutes()
        });
      });
      str = JSON.stringify(snap);
    });
    this.WR(str);
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
          <Button
            title="Punteggio"
            onPress={() =>
              this.props.navigation.navigate("Scores", { punteggio: scores })
            }
          />
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
