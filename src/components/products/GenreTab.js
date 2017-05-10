import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import Global from "../../Global";
import { Actions } from "react-native-router-flux";

const widthimage = Dimensions.get("window").width / 2;
const heightimage = (Dimensions.get("window").height -
  Global.navBarHeight -
  34) /
  4;

export default class GenreTab extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.results({
            genre: this.props.genre
          })}
      >
        <View style={styles.viewCard}>
          <Image style={styles.image} source={this.props.image}>
            <View style={styles.overlay}>
              <View style={styles.textView}>
                <Text style={styles.text}>{this.props.text}</Text>
              </View>
            </View>
          </Image>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: widthimage,
    height: heightimage,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewCard: {
    height: heightimage
  },
  textView: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: Global.secondColor,
    fontFamily: Global.secondFontBold,
    fontSize: 21,
    textAlign: "center"
  },
  overlay: {
    backgroundColor: "rgba(239,128,126, 0.35)",
    height: heightimage,
    width: widthimage
  }
});
