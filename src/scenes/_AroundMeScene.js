import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View,
  Button
} from "react-native";
import Api from "../Api.js";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import MapMovies from "../components/core/MapMovies";
import MapMovieTheaters from "../components/core/MapMovieTheaters";
import _ from "lodash";
import { TabViewAnimated, TabBar } from "react-native-tab-view";

let {
  height,
  width
} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    justifyContent: "center"
  }
});

export default class AroundMeScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: "",
      longitude: ""
    };
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
    });
  }

  getUserLocation() {
    Api.getBuddies(Api.getUser()._id, userInfo => {
      console.log(userInfo);
      this.setState({
        latitude: userInfo.userInfo.account.location.latitude,
        longitude: userInfo.userInfo.account.location.longitude
      });
    });
  }

  setLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      fetch(
        `${Config.host}/api/user/${Api.getUser()._id}/updateLocation/?lat=${position.coords.latitude}&long=${position.coords.longitude}&timestamp=${position.timestamp}`,
        {
          method: "POST"
        },
        console.log("coucou", position)
      );
    });
  }

  componentDidMount() {
    //this.getLocation();
    this.getUserLocation();
  }

  render() {
    return (
      <View>
        <Text>Around Me Scene</Text>
        {/*<MapMovies />*/}
        <MapMovieTheaters />

        <TouchableOpacity onPress={() => this.setLocation()}>
          <Text>Locate Me !</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
