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
import InteractionButton from "../components/core/InteractionButton";
import Fav from "../components/core/Fav";
import _ from "lodash";

let {
  height,
  width
} = Dimensions.get("window");

export default class UserProfileScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandText: false,
      userProfileInfo: [],
      userFavoriteMovies: []
      // disable: false
      // isBuddy: "",
      // isRequested: "",
      // isPendingAcceptance: ""
    };

    this.toggleView = this.toggleView.bind(this);
    // this.sendBuddyRequest = this.sendBuddyRequest.bind(this);
    // this.cancelBuddyRequest = this.cancelBuddyRequest.bind(this);
    // this.refuseBuddyRequest = this.refuseBuddyRequest.bind(this);
    // this.acceptBuddyRequest = this.acceptBuddyRequest.bind(this);
    // this.removeBuddy = this.removeBuddy.bind(this);
  }

  // permet de trouver si la search value apparait dans les valeurs d'un objet. Ici le but est de chercher si le buddy de la rowData est contenu dans le tableau des buddies, buddies requests ou buddies pending du user connecté
  mapObjectValue(object) {
    let result = object
      .map(function(x) {
        return x._id.toString();
      })
      .indexOf(this.props.userData._id) === -1
      ? false
      : true;
    return result;
  }

  componentDidMount() {
    Api.getBuddies(Api.getUser()._id, userProfileInfo => {
      // const isBuddy = this.mapObjectValue(
      //   userProfileInfo.userInfo.account.buddies
      // );
      // const isPendingAcceptance = this.mapObjectValue(
      //   userProfileInfo.userInfo.account.buddiesRequestsReceived
      // );
      // const isRequested = this.mapObjectValue(
      //   userProfileInfo.userInfo.account.buddiesRequestsSent
      // );
      this.setState({
        userProfileInfo: userProfileInfo.userInfo
        // isBuddy: isBuddy,
        // isRequested: isRequested,
        // isPendingAcceptance: isPendingAcceptance
      });
    });
    Api.getFavoriteMovies(Api.getUser()._id, userFavoriteMovies => {
      this.setState({
        userFavoriteMovies: userFavoriteMovies
      });
    });
  }

  openChat(userDataChat) {
    console.log("on ouvre le chat en cliquant ici");

    Actions.tchat({ userDataChat: userDataChat });
  }

  toggleView() {
    this.setState({
      expandText: !this.state.expandText
    });
  }

  renderSlidesMoveet() {
    const slides = this.state.userFavoriteMovies.map((movie, index) => (
      <TouchableOpacity
        onPress={() => Actions.movie({ movie: movie })}
        key={index}
        style={[styles.slide1, { position: "relative" }]}
      >

        <MovieQuickCard {...movie} />

      </TouchableOpacity>
    ));
    return (
      <View>
        <Swiper height={200}>
          {slides}
        </Swiper>
      </View>
    );
  }

  renderUserHeader() {
    if (!this.props.userData.matchingMovies) {
      return (
        <View>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 20,
              fontSize: 20,
              color: "black"
            }}
          >
            {this.props.userData.account.favorites.length} Films dans le pipe
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 20,
              fontSize: 20,
              color: "black"
            }}
          >
            {this.props.userData.account.favorites.length} {" "}
            Films dans le pipe, dont{" "}
            {this.props.userData.matchingMovies.length} en commun avec vous
          </Text>
        </View>
      );
    }
  }

  render() {
    console.log("UserProfileScene$userData", this.props.userData);
    console.log(
      "this.props.userData.matchingMovies",
      this.props.userData.matchingMovies
    );
    if (Object.keys(this.state.userProfileInfo).length <= 0) {
      return <View style={{ marginTop: 60 }}><Text>Loading...</Text></View>;
    } else {
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
              picture={this.props.userData.account.picture}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              paddingTop: 20,
              fontSize: 20,
              color: "black"
            }}
          >
            {this.props.userData.account.username}
          </Text>

          {this.renderUserHeader()}

          <Text
            style={{ padding: 30 }}
            numberOfLines={this.state.expandText ? 10 : 3}
            onPress={this.toggleView}
          >
            {this.props.userData.account.description}
          </Text>
          {this.renderSlidesMoveet()}
          <View>
            {this.renderInteractionButtons()}
          </View>

        </ScrollView>
      );
    }
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
