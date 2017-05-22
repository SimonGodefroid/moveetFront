import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import Global from "../../Global";
import { Actions } from "react-native-router-flux";
import Avatar from "../user/Avatar.js";

const widthimage = Dimensions.get("window").width;
const heightimage = (Dimensions.get("window").height - Global.navBarHeight) / 6;

export default class UserCard extends React.Component {
  // renderFavMovies(favorites) {
  //   return (
  //     <Text>
  //       {favorites.map(fav => {
  //         return fav;
  //       })}
  //     </Text>
  //   );
  // }

  render() {
    return (
      <View style={[styles.viewCard, { position: "relative" }]}>
        <View
          style={{
            position: "absolute",
            top: heightimage / 6 - 6,
            left: 20,
            zIndex: 10000
          }}
        >
          <Avatar
            height={70}
            width={70}
            borderRadius={35}
            picture={this.props.picture}
          />
        </View>
        <View
          style={[styles.overlay, { backgroundColor: "red", opacity: 0.5 }]}
        >
          <View style={styles.textView}>
            <Text style={styles.textHeader}>{this.props.username}</Text>
            <Text style={styles.textContent}>
              {this.props.age}
              ,
              {" "}
              {this.props.genre}
              ,
              {" "}
              {this.props.distance} km,
              {" "}
              {this.props.favoritesNum} Films
            </Text>
            {/*<Text style={styles.textSubContent}>
              {this.renderFavMovies(this.props.favorites)}
            </Text>*/}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: widthimage,
    height: heightimage,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewCard: {
    height: heightimage
  },
  textView: {
    flex: 1
    //justifyContent: "center"
  },
  textHeader: {
    color: Global.secondColor,
    fontFamily: Global.secondFontBold,
    fontSize: 22,
    position: "absolute",
    top: 5,
    left: 110
    //textAlign: "center"
  },
  textContent: {
    color: Global.secondColor,
    fontFamily: Global.secondFontBold,
    fontSize: 16,
    position: "absolute",
    top: 35,
    left: 110
  },
  textSubContent: {
    color: Global.secondColor,
    fontFamily: Global.secondFontBold,
    fontSize: 16,
    position: "absolute",
    top: 60,
    left: 110
  },
  overlay: {
    //backgroundColor: "rgba(239,128,126, 0.35)",
    height: heightimage,
    width: widthimage
  }
});
UserCard.defaultProps = {
  age: 28,
  genre: "Homme",
  distance: 1
};
