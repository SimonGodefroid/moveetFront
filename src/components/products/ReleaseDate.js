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
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import MovieReleaseDate from "../products/MovieReleaseDate";

const styles = StyleSheet.create({
  releaseDate: {}
});

export default class ReleaseDate extends React.Component {
  render() {
    console.log("this.props", this.props);

    let relDate = new Date(this.props.release.releaseDate)
      .toLocaleDateString("fr-FR")
      .substr(0, 5);
    return (
      <View>
        <Text
          style={{
            position: "absolute",
            right: 12,
            bottom: 22,
            zIndex: 100000,
            backgroundColor: "transparent",
            fontWeight: "bold"
          }}
        >
          {relDate}
        </Text>
        <IconFontAwesome
          name={"calendar-o"}
          size={60}
          color={Global.moveetRed}
          style={{
            position: "absolute",
            zIndex: -10,
            right: 6,
            bottom: 6
          }}
        />
      </View>
    );
  }
}
