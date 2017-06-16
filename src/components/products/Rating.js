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
  rating: {
    position: "absolute",
    right: 12,
    bottom: 4,
    zIndex: 100000,
    backgroundColor: "transparent",
    fontWeight: "bold"
  }
});

export default class Rating extends React.Component {
  computeColor() {
    if (
      this.props.statistics.userRating * 2 < 7 &&
      this.props.statistics.userRating * 2 > 5
    ) {
      return Global.moveetRatingOrange;
    } else if (this.props.statistics.userRating * 2 <= 5) {
      return Global.moveetRatingYellow;
    } else if (this.props.statistics.userRating * 2 >= 7) {
      return Global.moveetRatingGreen;
    }
  }
  render() {
    console.log("this.props", this.props);
    return (
      <View>
        <View>
          <Text style={styles.rating}>
            {!isNaN(this.props.statistics.userRating * 2)
              ? (this.props.statistics.userRating * 2).toFixed(1)
              : ""}
          </Text>
        </View>
        <IconMaterialCommunityIcons
          name={"popcorn"}
          size={40}
          color={this.computeColor()}
          style={{ position: "absolute", zIndex: -10, right: 4, bottom: 16 }}
        />
      </View>
    );
  }
}
