import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";

import { Router, Scene } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import IconMaterialCommunityIcons
  from "react-native-vector-icons/MaterialCommunityIcons";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchScene from "./src/scenes/SearchScene";
import ResultsScene from "./src/scenes/ResultsScene";
import MovieScene from "./src/scenes/MovieScene";
import MosaicScene from "./src/scenes/MosaicScene";
import LoginScene from "./src/scenes/LoginScene";
import AroundMeScene from "./src/scenes/AroundMeScene";
import TchatScene from "./src/scenes/TchatScene";
import BuddiesTabsScene from "./src/scenes/BuddiesTabsScene";
import BuddyFinderScene from "./src/scenes/BuddyFinderScene";
import UserProfileScene from "./src/scenes/UserProfileScene";
import SwipeMoviesScene from "./src/scenes/SwipeMoviesScene";
import MovieShowtimesScene from "./src/scenes/MovieShowtimesScene";
import Api from "./src/Api";
import Loading from "./src/components/core/Loading";
import Global from "./src/Global";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  componentDidMount() {
    Api.getStore(user => {
      this.setState({
        user: user
      });
      Api.setUser(user);
    });
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("light-content");
    }
  }
  render() {
    console.log(this.state.user);
    if (this.state.user === undefined) {
      console.log("loading...", this.state.user);
      return <Loading />;
    } else {
      return (
        <Router
          leftButtonIconStyle={{
            tintColor: "white"
          }}
          navigationBarStyle={{
            backgroundColor: Global.moveetColor
          }}
          hideNavBar={false}
          tabBarStyle={styles.tabBarStyle}
        >
          <Scene
            key={"tab"}
            tabs
            type={"replace"}
            initial={this.state.user !== null ? true : false}
          >
            <Scene
              key={"search"}
              titleStyle={{ color: "white" }}
              title={"Search"}
              component={SearchScene}
              icon={props => (
                <IconMaterialIcons
                  name={"local-movies"}
                  size={30}
                  color={props.selected ? "#AAA" : "#000"}
                />
              )}
            />
            <Scene
              key={"moviesswiper"}
              titleStyle={{ color: "white" }}
              title={"Movies Swiper"}
              component={SwipeMoviesScene}
              icon={props => (
                <IconMaterialCommunityIcons
                  name={"cards-outline"}
                  size={30}
                  color={props.selected ? "#AAA" : "#000"}
                />
              )}
            />
            <Scene
              key={"buddiestab"}
              titleStyle={{ color: "white" }}
              title={"Buddies"}
              component={BuddiesTabsScene}
              icon={props => (
                <IconMaterialIcons
                  name={"chat-bubble-outline"}
                  size={30}
                  color={props.selected ? "#AAA" : "#000"}
                />
              )}
            />
            <Scene
              key={"aroundme"}
              titleStyle={{ color: "white" }}
              title={"Autour de Moi"}
              component={AroundMeScene}
              icon={props => (
                <IconMaterialCommunityIcons
                  name={"map-marker"}
                  size={30}
                  color={props.selected ? "#AAA" : "#000"}
                />
              )}
            />
          </Scene>

          <Scene
            key={"buddyfinder"}
            titleStyle={{ color: "white" }}
            title={"Buddy Finder"}
            component={BuddyFinderScene}
          />
          <Scene
            key={"movieshowtimes"}
            titleStyle={{ color: "white" }}
            title={"MovieShowtimes"}
            component={MovieShowtimesScene}
          />

          <Scene
            key={"results"}
            title={"Résultats"}
            component={ResultsScene}
            titleStyle={{ color: "white" }}
          />
          <Scene
            key={"movie"}
            title={"Page Film"}
            component={MovieScene}
            titleStyle={{ color: "white" }}
          />

          {/*<Scene
            key={"mosaic"}
            component={MosaicScene}
            initial={this.state.user !== null ? true : false}
            hideNavBar={true}
          />*/}
          <Scene
            key={"userprofile"}
            component={UserProfileScene}
            hideNavBar={false}
            title={"Page Profil"}
          />
          <Scene
            key={"login"}
            component={LoginScene}
            initial={this.state.user === null ? true : false}
          />
          <Scene
            key={"tchat"}
            titleStyle={{ color: "white" }}
            title={"Messages"}
            hideNavBar={false}
            direction={"vertical"}
            //navigationBarStyle={{ backgroundColor: "#ffffff" }}
            component={TchatScene}
          />
        </Router>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  tabBarStyle: {
    borderTopWidth: 0.5,
    borderColor: "#b7b7b7",
    backgroundColor: "white",
    opacity: 1
  }
});
