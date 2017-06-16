import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as Progress from "react-native-progress";
import Global from "../../Global";
import Images from "./Images";

export default class Loading extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require("../../../assets/img/mov-bg-wv.png")}
          style={styles.activity_container}
        >

          <View
            style={{
              height: 115,
              width: 115,
              position: "absolute",
              top: 80,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Progress.CircleSnail
              color={Global.moveetRed}
              size={100}
              thickness={3}
              animating={true}
              indeterminate={false}
            />
          </View>
        </Image>

      </View>
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
