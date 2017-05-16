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
import Api from "../Api.js";
//import MovieCard from "../components/products/MovieCard";
import MovieQuickCard from "../components/products/MovieQuickCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import Swiper from "react-native-swiper";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import Fav from "../components/core/Fav";
import _ from "lodash";

let {
  height,
  width
} = Dimensions.get("window");

export default class UserProfileScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = { res: "" };
  }

  getUserProfilePicture(user, callback) {
    fetch(`https://graph.facebook.com/${user.credentials.userId}/picture`)
      .then(res => {
        console.log("res", res);
        callback(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserProfilePicture(this.props.data, res => {
      this.setState({
        res: res.url
      });
    });
  }

  render() {
    return (
      <ScrollView
        style={{
          marginTop: 60,
          position: "relative"
          //backgroundColor: "blue"
        }}
      >
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Avatar
            height={150}
            width={150}
            borderRadius={75}
            picture={this.state.res}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            paddingTop: 20,
            fontSize: 20,
            color: "black"
          }}
        />

      </ScrollView>
    );
  }
}
var styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD6EB"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
