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
import MapBuddies from "../components/core/MapBuddies";
import MapMovieTheaters from "../components/core/MapMovieTheaters";
import _ from "lodash";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

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
      latitude: 0,
      longitude: 0,
      index: 0,
      routes: [{ key: "1", title: "Cinémas" }, { key: "2", title: "Buddies" }]
    };
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
        }
      );
    });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      Api.updateUserLocation(position);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

  _handleChangeTab = index => {
    this.setState({ index });
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "red" }}
        labelStyle={{ color: "white" }}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "1":
        if (this.state.latitude === "" || this.state.latitude === 0) {
          return (
            <View style={{ margin: 50 }}>
              <Text>Vous devez d'abord autoriser la géolocalisation</Text>
            </View>
          );
        }
        return (
          <View style={styles.page}>
            <MapMovieTheaters
              latitude={this.state.latitude}
              longitude={this.state.longitude}
            />
          </View>
        );
      case "2":
        if (this.state.latitude === "" || this.state.latitude === 0) {
          return (
            <View>
              <Text>Vous devez d'abord autoriser la géolocalisation</Text>
            </View>
          );
        }
        return (
          <View style={styles.page}>
            <MapBuddies
              latitude={this.state.latitude}
              longitude={this.state.longitude}
            />
          </View>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, { marginTop: 64 }]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}
// render() {
//   return (
//     <View>
//       <Text>Around Me Scene</Text>
//       {/*<MapMovies />*/}
//       <MapMovieTheaters
//         latitude={this.state.latitude}
//         longitude={this.state.longitude}
//       />

//       <TouchableOpacity onPress={() => this.setLocation()}>
//         <Text>Locate Me !</Text>
//       </TouchableOpacity>

//     </View>
//   );
// }
