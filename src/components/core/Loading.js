import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import Images from "./Images";

export default class Loading extends React.Component {
  render() {
    return (
      <Image
        source={require("../../../assets/img/bg-wo.png")}
        style={styles.activity_container}
      >
        <Image
          source={Images.moveetLoad}
          style={{
            height: 115,
            width: 115
          }}
        />
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  activity_container: {
    flex: 1,
    resizeMode: "cover",
    width: null,
    alignItems: "center",
    justifyContent: "center"
  }
});
