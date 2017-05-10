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
import Global from "../../Global";
import Icon from "react-native-vector-icons/Ionicons";

let {
  height,
  width
} = Dimensions.get("window");

export default class Star extends React.Component {
  render() {
    return (
      <Icon
        name={this.props.name}
        color={this.props.color}
        style={{ fontSize: 30, backgroundColor: "transparent" }}
      />
    );
  }
}
