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
import { Actions } from "react-native-router-flux";
import Loading from "./Loading";

let {
  height,
  width
} = Dimensions.get("window");

let Card = React.createClass({
  render() {
    return (
      <TouchableOpacity onPress={() => Actions.movie({ movie: this.props })}>
        <View
          style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
        >
          <Image
            style={{
              marginTop: 20,
              height: height - 180,
              width: width - 20,
              position: "relative"
            }}
            source={{ uri: this.props.posterPath }}
          />

          <View style={{ marginTop: 5, alignItems: "center" }}>

            <Text>{this.props.originalTitle}</Text>
            <Text>
              {" "}
              {this.props.statusList === "nowshowing"
                ? `A l'affiche dans ${this.props.statistics.theaterCount} salles`
                : `Sortie prévue le`}
            </Text>
            <Text>
              {new Date(this.props.release.releaseDate).toLocaleDateString(
                "fr-FR"
              )}
            </Text>
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
      <View style={{ flex: 1, width: width }}>
        <Loading />
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
    // console.log(`Yup for ${card.originalTitle}`);
    // console.log(`Yup for ${card._id}`);
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
    // console.log(`Nope for ${card.originalTitle}`);
    // console.log(`Nope for ${card._id}`);
    fetch(
      `${Config.host}/api/user/${Api.getUser()._id}/moviesSwiperDislike/${card._id}`,
      {
        method: "POST"
      }
    );
  }
  // handleMaybe(card) {
  //   console.log(`Maybe for ${card.originalTitle}`);
  //   console.log(`Maybe for ${card._id}`);
  // }

  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    // console.log("this.state.cards", this.state.cards);
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        //handleMaybe={this.handleMaybe}
        yupText={"Oui !"}
        nopeText={"Non !"}
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
    height: 300,
    marginTop: 40
  },
  // noMoreCardsText: {
  //   fontSize: 22
  // }
});
