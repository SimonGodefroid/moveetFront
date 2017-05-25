import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  Modal
} from "react-native";
import Global from "../../Global";
import { Actions } from "react-native-router-flux";

export default class MyCustomCalloutView extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.theater({ theater: this.props });
        }}
        style={{ width: 200 }}
      >
        <Text style={{ marginLeft: 3 }}>{this.props.name}</Text>
        <Text>{this.props.address}, {this.props.city}</Text>

      </TouchableOpacity>
    );
  }
}
