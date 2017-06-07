import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View
} from "react-native";
import Api from "../Api.js";
import MovieCard from "../components/products/MovieCard";
import MovieQuickCard from "../components/products/MovieQuickCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import Loading from "../components/core/Loading";
import Swiper from "react-native-swiper";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import Fav from "../components/core/Fav";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";

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
    };
  }

  // permet de trouver si la search value apparait dans les valeurs d'un objet. Ici le but est de chercher si le buddy de la rowData est contenu dans le tableau des buddies, buddies requests ou buddies pending du user connecté
  mapObjectValue(object) {
    let result = object
      .map(function (x) {
        return x._id.toString();
      })
      .indexOf(this.state.userProfileInfo._id) === -1
      ? false
      : true;
    return result;
  }

  componentDidMount() {
    Api.getBuddies(Api.getUser()._id, userProfileInfo => {
      this.setState({
        userProfileInfo: userProfileInfo.userInfo
      });
    });
    Api.getFavoriteMovies(Api.getUser()._id, userFavoriteMovies => {
      this.setState({
        userFavoriteMovies: userFavoriteMovies
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    this.setState({ userProfileInfo: nextProps.user });
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
      <View style={{ marginBottom: 20 }}>
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
    if (!this.state.userProfileInfo.matchingMovies) {
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
            {this.state.userProfileInfo.account.favorites.length}
            {" "}
            Films dans le pipe
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

            {this.state.userProfileInfo.account.favorites.length} {" "}
            Films dans le pipe
          </Text>
        </View>
      );
    }
  }

  render() {
    console.log(
      "MyProfileScene$this.state",
      !this.state.userProfileInfo.account
        ? ""
        : this.state.userProfileInfo.account.username
    );
    console.log("Myprofile API.getUser()", Api.getUser());
    if (Object.keys(this.state.userProfileInfo).length <= 0) {
      return <Loading />;
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
              picture={this.state.userProfileInfo.account.picture}
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
            {this.state.userProfileInfo.account.username}
            ,
            {this.state.userProfileInfo.account.genre}
            ,
            {this.state.userProfileInfo.account.age}
          </Text>

          {this.renderUserHeader()}

          <Text style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
            A propos de moi:{"\n"}{"\n"}
            {this.state.userProfileInfo.account.description}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Actions.editprofile({ userData: this.state.userProfileInfo })}
            style={{
              //marginRight: 100,
              //marginLeft: 100,

              height: 50,
              margin: 50,
              marginTop: 5,
              alignItems: "center",
              backgroundColor: Global.moveetColor,
              borderRadius: 25,
              borderWidth: 5,
              borderColor: Global.moveetColor,
              marginBottom: 15
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 10
              }}
            >
              Editer mes informations
            </Text>
          </TouchableOpacity>
          <View style={{ marginBottom: 60 }}>
            {this.renderSlidesMoveet()}
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
