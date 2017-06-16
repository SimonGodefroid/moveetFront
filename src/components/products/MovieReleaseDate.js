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
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const styles = StyleSheet.create({
  releaseDate: {}
});

export default class MovieReleaseDate extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ marginVertical: 4 }}>
          {new Date(this.props.movie.release.releaseDate).toLocaleDateString(
            "fr-FR"
          )}
        </Text>
      </View>
    );
  }
}
