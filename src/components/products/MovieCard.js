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

let textLimit = 150;

let {
  height,
  width
} = Dimensions.get("window");

export default class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxlimit: 50
    };
  }
  render() {
    return (
      <View
        style={{
          width: width,
          height: 200,
          padding: 10,
          flexDirection: "row",
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 1
        }}
      >
        <Image
          style={{ height: 175, width: 125 }}
          source={{ uri: this.props.poster }}
        />
        <View style={{ paddingLeft: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", width: 200 }}>
            {this.props.title}
          </Text>
          <View style={{ width: 200 }}>
            <Text>
              {this.props.synopsis.length > textLimit
                ? this.props.synopsis.substring(0, textLimit - 3) + "..."
                : this.props.synopsis.length}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
