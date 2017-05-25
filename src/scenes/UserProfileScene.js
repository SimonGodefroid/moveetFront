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
      userFavoriteMovies: [],
      disable: false,
      isBuddy: "",
      isRequested: "",
      isPendingAcceptance: ""
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
    Api.getFavoriteMovies(this.props.userData._id, userFavoriteMovies => {
      this.setState({
        userFavoriteMovies: userFavoriteMovies
      });
    });
  }

  // on appelle le bouton en fonction des actions à faire et on lui passe les arguments
  renderInteractionButtons() {
    {
      /*
    if (!this.state.isBuddy) {
      if (this.state.isRequested) {
        return this.renderButton(
          "Annuler la demande d'ami",
          this.cancelBuddyRequest
        );
      } else if (this.state.isPendingAcceptance) {
        return (
          <View>
            {this.renderButton(
              "Accepter la demande d'ami",
              this.acceptBuddyRequest
            )}
            {this.renderButton(
              "Refuser la demande d'ami",
              this.refuseBuddyRequest
            )}
          </View>
        );
      } else {
        return this.renderButton(
          "Envoyer une demande d'ami",
          this.sendBuddyRequest
        );
      }
    } else if (this.state.isBuddy) {
      return (
        <View>
          {this.renderButton("Ouvrir le chat", this.openChat)}
          {this.renderButton("Retirer des amis", this.removeBuddy)}
        </View>
      );
    }*/
    }
    return (
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        {this.renderButton(
          "Chatter avec ",
          "",
          this.props.userData.account.username,
          () => this.openChat(this.props.userData)
        )}
      </View>
    );
  }

  renderInviteButton() {
    return (
      <View style={{ alignItems: "center", marginBottom: 30 }}>
        {this.renderButton(
          "Proposer un film à ",
          this.props.userData.account.username,
          "",
          () => this.openChat(this.props.userData)
        )}
      </View>
    );
  }
  // le composant bouton prend pour arguments un texte et une méthode.
  renderButton(text, text2, text3, method) {
    return (
      <InteractionButton
        text={text}
        text2={text2}
        text3={text3}
        onPressFn={method}
        currentUser={Api.getUser()._id}
        buddyUser={this.props.userData._id}
        color={"white"}
        backgroundColor={Global.moveetColor}
      />
    );
  }

  openChat(userDataChat) {
    console.log("on ouvre le chat en cliquant ici");

    Actions.tchat({ userDataChat: userDataChat });
  }

  // sendBuddyRequest(userId, buddyId, callback) {
  //   fetch(`${Config.host}/api/user/${userId}/sendBuddyRequest/${buddyId}`, {
  //     method: "POST"
  //   });
  //   this.setState({
  //     isRequested: true
  //   });
  // }

  // cancelBuddyRequest(userId, buddyId, callback) {
  //   console.log("cancel buddy request$buddyId", buddyId);
  //   fetch(`${Config.host}/api/user/${userId}/cancelBuddyRequest/${buddyId}`, {
  //     method: "POST"
  //   });
  //   this.setState({
  //     isBuddy: false,
  //     isRequested: false
  //   });
  // }

  // refuseBuddyRequest(userId, buddyId, callback) {
  //   fetch(`${Config.host}/api/user/${userId}/refuseBuddyRequest/${buddyId}`, {
  //     method: "POST"
  //   });
  //   this.setState({
  //     isBuddy: false,
  //     isPendingAcceptance: false
  //   });
  // }

  // acceptBuddyRequest(userId, buddyId, callback) {
  //   fetch(`${Config.host}/api/user/${userId}/acceptBuddyRequest/${buddyId}`, {
  //     method: "POST"
  //   });
  //   this.setState({
  //     isBuddy: true,
  //     isPendingAcceptance: false
  //   });
  // }

  // removeBuddy(userId, buddyId, callback) {
  //   fetch(`${Config.host}/api/user/${userId}/removeBuddy/${buddyId}`, {
  //     method: "POST"
  //   });
  //   this.setState({
  //     isBuddy: false
  //   });
  // }

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
    if (Object.keys(this.state.userFavoriteMovies).length === 0) {
      return (
        <View>
          <Text style={{ textAlign: "center" }}>
            {this.props.userData.account.username}
            {" "}
            n'a pas encore de films à voir
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Swiper
          height={200}
          dotColor={"black"}
          activeDotColor={"red"}
          dotStyle={{ marginBottom: -80 }}
          activeDotStyle={{ marginBottom: -80 }}
        >
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
              //paddingTop: 20,
              padding: 20,
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
              paddingTop: 10,
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
          <View style={{ alignItems: "center", marginTop: 10 }}>
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
              paddingTop: 10,
              fontSize: 20,
              color: "black"
            }}
          >
            {this.props.userData.account.username}
          </Text>

          {this.renderUserHeader()}

          <Text
            style={{ padding: 10 }}
            numberOfLines={this.state.expandText ? 10 : 3}
            onPress={this.toggleView}
          >
            {this.props.userData.account.description}
          </Text>
          {this.renderSlidesMoveet()}
          <View>
            {this.renderInteractionButtons()}
            {this.renderInviteButton()}
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
    backgroundColor: "black"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  }
});
