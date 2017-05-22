import React from "react";

import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  ListView,
  TouchableOpacity
} from "react-native";

import Api from "../../Api";
import Config from "../../Config";
import Global from "../../Global";
import Icon from "react-native-vector-icons/Ionicons";

class Fav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heart: false
    };
  }

  componentDidMount() {
    Api.getFavoriteMovies(Api.getUser()._id, favoritesList => {
      let favoriteIds = [];
      favoritesList.map(favorite => favoriteIds.push(favorite._id));
      if (favoriteIds.indexOf(this.props.movieId) !== -1) {
        this.setState({
          heart: true
        });
      }
    });
  }

  addToFav(userId, movieId, callback) {
    console.log("addToFav clicked");
    console.log("addToFav$userId", userId);
    console.log("addToFav$movieId", movieId);
    fetch(`${Config.host}/api/user/${userId}/toggleFavorite/${movieId}`, {
      method: "POST"
    });
    this.setState({
      heart: !this.state.heart
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.addToFav(Api.getUser()._id, this.props.movieId)}
      >
        <Icon
          name={this.state.heart ? "ios-heart" : "ios-heart-outline"}
          size={this.props.size ? this.props.size : 35}
          style={{ backgroundColor: "transparent" }}
          color={Global.heartColor}
        />
      </TouchableOpacity>
    );
  }
}

export default Fav;
