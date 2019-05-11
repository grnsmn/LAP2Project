// implementare grafica questionario
import { StyleSheet, View, ScrollView, Button } from "react-native";
import React from "react";
import * as firebase from "firebase";
import { Text, Header, CheckBox } from "react-native-elements";

const database = firebase.database();
export default class Questions extends React.Component {
  state = {
    data: []
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
    // console.log(navigation.getParam("scelta"));

    // leggere il nostro array proveniente da firebase
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
          d: { testo: child.child("D").val(), check: false }
        });
      });
      this.setState({ data: elenco });
      // console.log(this.state.data);
    });
  }

  onUpdateItem = (risp, i) => {
    this.setState(state => {
      const data = state.data.map((item, j) => {
        if (j == i) {
          switch (risp) {
            case 1:
              return (newItem = {
                domanda: item.domanda,
                a: { testo: item.a.testo, check: !item.a.check },
                b: { testo: item.b.testo, check: item.b.check },
                c: { testo: item.c.testo, check: item.c.check },
                d: { testo: item.d.testo, check: item.d.check }
              });
            case 2:
              return (newItem = {
                domanda: item.domanda,
                a: { testo: item.a.testo, check: item.a.check },
                b: { testo: item.b.testo, check: !item.b.check },
                c: { testo: item.c.testo, check: item.c.check },
                d: { testo: item.d.testo, check: item.d.check }
              });
            case 3:
              return (newItem = {
                domanda: item.domanda,
                a: { testo: item.a.testo, check: item.a.check },
                b: { testo: item.b.testo, check: item.b.check },
                c: { testo: item.c.testo, check: !item.c.check },
                d: { testo: item.d.testo, check: item.d.check }
              });
            case 4:
              return (newItem = {
                domanda: item.domanda,
                a: { testo: item.a.testo, check: item.a.check },
                b: { testo: item.b.testo, check: item.b.check },
                c: { testo: item.c.testo, check: item.c.check },
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
        {this.state.data.map((l, i) => (
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
        ))}
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
