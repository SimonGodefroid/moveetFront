import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View
} from "react-native";

let {
  height,
  width
} = Dimensions.get("window");

export default class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: this.props.backgroundColor,
          width: 200,
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 20,
          borderColor: "white",
          padding: 10,
          marginTop: 30
        }}
        onPress={() =>
          this.props.onPressFn(this.props.currentUser, this.props.buddyUser)}
      >
        <Text
          style={{
            textAlign: "center",
            color: this.props.color
          }}
        >
          {this.props.text}{this.props.text2}{this.props.text3}
        </Text>
      </TouchableOpacity>
    );
  }
}
