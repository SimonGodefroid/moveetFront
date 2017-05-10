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
      <Text
        style={{ textAlign: "center", margin: 30 }}
        onPress={() => this.props.onPressFn()}
      >
        {this.props.text}
      </Text>
    );
  }
}
