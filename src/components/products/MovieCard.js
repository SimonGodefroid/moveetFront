import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View
} from "react-native";
import Global from "../../Global";
let textLimit = 145;
let titleLimit = 45;

const styles = StyleSheet.create({});

let { height, width } = Dimensions.get("window");

export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxlimit: 50,
      titleMaxLimit: 30
    };
  }
  render() {
    return (
      <View
        style={{
          width: width,
          height: 200,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          flexDirection: "row",
          borderColor: Global.moveetRed,
          borderStyle: "solid",
          borderWidth: 0.5
        }}
      >
        <Image
          style={{ height: 200, width: 135 }}
          source={{ uri: this.props.poster }}
        />
        <View style={{ paddingLeft: 10, paddingTop: 5, width: width - 140 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {this.props.title.length > titleLimit
              ? this.props.title.substring(0, titleLimit - 3) + "..."
              : this.props.title}
          </Text>
          <View style={{ width: width - 160, backgroundColor: "transparent" }}>
            <Text style={{ textAlign: "left", paddingTop: 5 }}>
              {this.props.synopsis.length > textLimit
                ? this.props.synopsis.substring(0, textLimit - 3) + "..."
                : this.props.synopsis}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
