import React, { Component } from "react";
import {
  StyleSheet,
  ListView,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View
} from "react-native";
import Fav from "../core/Fav";
let textLimit = 150;

let {
  height,
  width
} = Dimensions.get("window");

export default class MovieQuickCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxlimit: 50
    };
  }

  renderGenre(genreList) {
    const genres = genreList.map((genre, index) => (
      <View key={index}><Text>{genre}</Text></View>
    ));
    return <View>{genres}</View>;
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", position: "relative" }}>

        <Image
          style={{ height: 175, width: 125, margin: 10 }}
          source={{ uri: this.props.posterPath }}
        />

        <View style={{ width: width - 175 - 10 }}>
          <Text style={{ marginTop: 10 }}>{this.props.originalTitle}</Text>
          <Text style={{ marginTop: 10 }}>
            Sortie:
            {new Date(this.props.release.releaseDate).toLocaleDateString(
              "fr-FR"
            )}
          </Text>
          <Text>
            Réalisé par : {this.props.castingShort.directors}
          </Text>
          <Text>
            Dans {this.props.statistics.theaterCount} salles
          </Text>
          <Text>
            Critiques Presse {this.props.statistics.pressRating * 2}/10
          </Text>
          <View>
            {this.renderGenre(this.props.genreList)}
          </View>
        </View>
        <Fav
          style={{ position: "absolute", top: 50 }}
          movieId={this.props._id}
        />
      </View>
    );
  }
}
