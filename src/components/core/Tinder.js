// Tinder.js
"use strict";

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Api from "../../Api";
import Config from "../../Config";
import SwipeCards from "react-native-swipe-cards";

let {
  height,
  width
} = Dimensions.get("window");

let Card = React.createClass({
  render() {
    return (
      <TouchableOpacity onPress={() => console.log("pressed")}>
        <View
          style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
        >
          <Image
            style={{ marginTop: 60, height: height - 180, width: width - 40 }}
            source={{ uri: this.props.posterPath }}
          />
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text>
              {new Date(this.props.release.releaseDate).toLocaleDateString(
                "fr-FR"
              )}
            </Text>
            <Text>{this.props.statusList}</Text>
            <Text>{this.props.originalTitle}</Text>
            <Text>{this.props.statistics.theaterCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
});

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>Loading Movies</Text>
      </View>
    );
  }
}

export default class Tinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    // Api.getSortedMovies(2, moviesToSwipe => {
    //   this.setState({
    //     cards: moviesToSwipe.comingSoonMovies
    //   });
    // });
    Api.getSwiperMoviesDeck(Api.getUser()._id, moviesToSwipe => {
      this.setState({
        cards: moviesToSwipe.movies
      });
    });
  }

  handleYup(card) {
    console.log(`Yup for ${card.originalTitle}`);
    console.log(`Yup for ${card._id}`);
    fetch(
      `${Config.host}/api/user/${Api.getUser()._id}/moviesSwiperLike/${card._id}`,
      {
        method: "POST"
      }
    );
    fetch(
      `${Config.host}/api/user/${Api.getUser()._id}/toggleFavorite/${card._id}`,
      {
        method: "POST"
      }
    );
  }
  handleNope(card) {
    console.log(`Nope for ${card.originalTitle}`);
    console.log(`Nope for ${card._id}`);
    fetch(
      `${Config.host}/api/user/${Api.getUser()._id}/moviesSwiperDislike/${card._id}`,
      {
        method: "POST"
      }
    );
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.originalTitle}`);
    console.log(`Maybe for ${card._id}`);
  }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    console.log("this.state.cards", this.state.cards);
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300
  },
  noMoreCardsText: {
    fontSize: 22
  }
});
