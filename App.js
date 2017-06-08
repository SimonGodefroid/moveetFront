import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";

import { Router, Scene } from "react-native-router-flux";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialCommunityIcons
  from "react-native-vector-icons/MaterialCommunityIcons";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import SearchScene from "./src/scenes/SearchScene";
import ResultsScene from "./src/scenes/ResultsScene";
import MovieScene from "./src/scenes/MovieScene";
import EditProfileScene from "./src/scenes/EditProfileScene";
import MosaicScene from "./src/scenes/MosaicScene";
import SignUpScene from "./src/scenes/SignUpScene";
// import FacebookProfileScene from "./src/scenes/FacebookProfileScene";
import LoginScene from "./src/scenes/LoginScene";
// import LoginFacebookScene from "./src/scenes/LoginFacebookScene";
import AroundMeScene from "./src/scenes/AroundMeScene";
import TchatScene from "./src/scenes/TchatScene";
import TheaterScene from "./src/scenes/TheaterScene";
import BuddiesTabsScene from "./src/scenes/BuddiesTabsScene";
import BuddyFinderScene from "./src/scenes/BuddyFinderScene";
import UserProfileScene from "./src/scenes/UserProfileScene";
import SwipeMoviesScene from "./src/scenes/SwipeMoviesScene";
import MyProfileScene from "./src/scenes/MyProfileScene";
import MovieShowtimesScene from "./src/scenes/MovieShowtimesScene";
import Api from "./src/Api";
import Loading from "./src/components/core/Loading";
import { Actions } from "react-native-router-flux";
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
    console.log("App this.state.user ", this.state.user);
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
          //initial={this.state.user !== null ? true : false}
          >
            <Scene
              key={"search"}
              titleStyle={{ color: "white" }}
              title={"Moveet"}
              component={SearchScene}
              initial
              icon={props => (
                <IconMaterialIcons
                  name={"local-movies"}
                  size={30}
                  color={props.selected ? Global.moveetRed : "#FFF"}
                />
              )}
              //onRight={() => Actions.myprofile({ userData: Api.getUser() })}
              onRight={() => Actions.myprofile({})}
              rightTitle={
                <IconFontAwesome
                  name={"user-circle"}
                  size={30}
                  color={"white"}
                />
              }
              //<Text style={{ color: "white" }}>Mon Profil</Text>}
              initial={this.state.user !== null ? true : false}
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
                  color={props.selected ? Global.moveetRed : "#FFF"}
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
                  color={props.selected ? Global.moveetRed : "#FFF"}
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
                  color={props.selected ? Global.moveetRed : "#FFF"}
                />
              )}
            />
          </Scene>
          <Scene
            key="myprofile"
            component={MyProfileScene}
            title="Mon Profil"
            titleStyle={{ color: "white" }}
            onLeft={() => Actions.search({})}
            leftTitle={<Text style={{ color: "white" }}>Retour</Text>}
            onRight={() => {
              Api.logOut(() => {
                Actions.login({ type: "replace" });
              });
            }}
            rightTitle={
              <IconIonicons
                name={"ios-log-out-outline"}
                size={30}
                color={"white"}
              />
            }
          //<Text style={{ color: "white" }}>Deconnexion</Text>}
          />
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

          <Scene
            key={"userprofile"}
            component={UserProfileScene}
            hideNavBar={false}
            title={"Page Profil"}
            titleStyle={{ color: "white" }}
          />
          <Scene
            key={"editprofile"}
            component={EditProfileScene}
            hideNavBar={false}
            title={"Edition du Profil"}
            titleStyle={{ color: "white" }}
          />
          <Scene
            key={"login"}
            component={LoginScene}
            titleStyle={{ color: "white" }}
            initial={this.state.user === null ? true : false}
            hideNavBar={true}
          />
          <Scene
            key={"signup"}
            component={SignUpScene}
            title={"Créer un compte"}
            titleStyle={{ color: "white" }}
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
          <Scene
            key={"theater"}
            titleStyle={{ color: "white" }}
            title={"Cinéma"}
            hideNavBar={false}
            direction={"vertical"}
            //navigationBarStyle={{ backgroundColor: "#ffffff" }}
            component={TheaterScene}
          />
          {/*<Scene
            key={"facebookprofilescene"}
            component={FacebookProfileScene}
            hideNavBar={false}
            title={"Profil Facebook"}
            titleStyle={{ color: "white" }}
          />*/}
          {/*<Scene
            key={"loginfacebook"}
            component={LoginFacebookScene}
            titleStyle={{ color: "white" }}
            initial={this.state.user === null ? true : false}
            hideNavBar={true}
          />*/}
          {/*<Scene
            key={"mosaic"}
            component={MosaicScene}
            initial={this.state.user !== null ? true : false}
            hideNavBar={true}
          />*/}

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
    backgroundColor: "black",
    opacity: 1
  }
});
