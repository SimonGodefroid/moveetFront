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

import Global from "../../Global.js";

let {
  height,
  width
} = Dimensions.get("window");

export default class Avatar extends React.Component {
  render() {
    return (
      <View
        style={{
          borderStyle: "solid",
          borderWidth: 3,
          borderColor: "white",
          height: this.props.height + 6,
          width: this.props.width + 6,
          borderRadius: this.props.borderRadius + 6
        }}
      >
        <Image
          style={{
            height: this.props.height,
            width: this.props.width,
            borderRadius: this.props.borderRadius
          }}
          //source={require("../../../assets/img/cropped_linkedin_photo.png")}
          source={{
            uri: this.props.picture === ""
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBtiZXuF2iXY7y5Z3HRCRVs1WJj0i6f8f0ueX3VIJo-PpUk8vi"
              : this.props.picture
          }}
        />
      </View>
    );
  }
}

// Avatar.defaultProps = {
//   image: "../../../assets/img/cropped_linkedin_photo.png"
// };
