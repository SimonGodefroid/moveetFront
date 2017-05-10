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
import Api from "../../Api.js";
import Global from "../../Global.js";
import Icon from "../core/Icon.js";
import { Actions } from "react-native-router-flux";

let {
  height,
  width
} = Dimensions.get("window");

export default class ShowtimeCard extends React.Component {
  render() {
    return (
      <TouchableOpacity style={{ height: 120 }}>
        <View>
          <Text>Coucou Showtime Card</Text>
          <Text>{this.props.place}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
