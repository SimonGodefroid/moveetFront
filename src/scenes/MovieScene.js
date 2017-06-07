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
import Global from "../Global.js";
import MovieCard from "../components/products/MovieCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import Button from "../components/core/Button";
import Fav from "../components/core/Fav";
import { Actions } from "react-native-router-flux";
import _ from "lodash";

let {
  height,
  width
} = Dimensions.get("window");

export default class MovieScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandText: false
    };
    this.toggleView = this.toggleView.bind(this);
  }

  toggleView() {
    this.setState({
      expandText: !this.state.expandText
    });
  }

  renderStatusList(movie) {
    if (movie.statusList === "comingsoon") {
      return (
        <Text
          style={{
            color: "white",
            backgroundColor: "green",
            padding: 10,
            textAlign: "center"
          }}
        >
          Bientôt à l'affiche
        </Text>
      );
    }
    return (
      <Text
        style={{
          color: "white",
          backgroundColor: Global.moveetRed,
          padding: 10,
          textAlign: "center"
        }}
      >
        À l'affiche dans {this.props.movie.statistics.theaterCount} salles
      </Text>
    );
  }

  renderShowTimesButton(movie) {
    if (movie.statusList === "comingsoon") {
      return <Text>Il n'y a pas encore de séances pour ce film</Text>;
    }
    return (
      <TouchableOpacity
        onPress={() =>
          Actions.movieshowtimes({ movie: { ...this.props.movie } })}
        style={{
          marginRight: 30,
          marginLeft: 30,
          marginTop: 5,
          backgroundColor: "black",
          borderRadius: 20,
          borderWidth: 5,
          borderColor: "black"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            padding: 5,
            borderColor: "#fff"
            //            backgroundColor: "black"
          }}
        >
          {" "}Voir les horaires{" "}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Image
        style={{
          marginTop: 70,
          margin: 5,
          height: height - 50,
          width: width - 10,
          flex: 1
        }}
        source={{ uri: this.props.movie.posterPath }}
      >
        <View
          style={{ position: "absolute", top: 10, right: 10, zIndex: 1000 }}
        >
          <Fav movieId={this.props.movie._id} />
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: height / 2 - 50,
              alignItems: "center",
              width: width,
              backgroundColor: "rgba(255, 255, 255,0.9)"
            }}
          >
            <View>
              <Text style={{ marginTop: 10, fontSize: 20, textAlign: 'center' }}>
                {this.props.movie.originalTitle.toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={{ marginVertical: 4 }}>
                {new Date(
                  this.props.movie.release.releaseDate
                ).toLocaleDateString("fr-FR")}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              {this.renderStatusList(this.props.movie)}

            </View>
            <View style={{ marginTop: 10, width: width - 20 }}>
              <Text
                style={{
                  lineHeight: 18
                }}
                onPress={this.toggleView}
                numberOfLines={this.state.expandText ? 100 : 3}
              >
                {console.log('this.props.movie', this.props.movie)}
                Réalisé par: {this.props.movie.castingShort.directors}{"\n"}
                Avec:
              </Text>
              <Text
                style={{
                  lineHeight: 18
                }}
                onPress={this.toggleView}
                numberOfLines={this.state.expandText ? 100 : 3}
              >
                {this.props.movie.synopsis}
              </Text>
            </View>
            <View style={{ margin: 10 }}>
              {this.renderShowTimesButton(this.props.movie)}
            </View>
            <View style={{ margin: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  Actions.buddyfinder({ movie: { ...this.props.movie } })}
                style={{
                  marginRight: 30,
                  marginLeft: 30,
                  marginTop: 5,
                  backgroundColor: Global.moveetColor,
                  borderRadius: 25,
                  borderWidth: 5,
                  borderColor: Global.moveetColor,
                  marginBottom: 5
                }}
              >
                <Text
                  style={{
                    color: "white",
                    padding: 5
                  }}
                >
                  Trouver un buddy pour ce film
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </Image>
    );

    // original movie scene:

    // <ScrollView style={{ marginTop: 60 }}>
    //   <View style={{ padding: 10 }}>
    //     <View
    //       style={{
    //         position: "relative",
    //         alignItems: "center"
    //       }}
    //     >
    //       <Image
    //         style={{ height: 175, width: width }}
    //         source={{ uri: this.props.movie.posterPath }}
    //       />
    //       {/*<Image
    //         style={{ height: 150, width: width - 20 }}
    //         source={{
    //           uri: `https://image.tmdb.org/t/p/w1000`
    //         }}
    //       />*/}

    //       <View style={{ position: "absolute", top: 75 }}>
    //         <Text
    //           style={{
    //             color: "black",
    //             backgroundColor: "transparent",
    //             textAlign: "center"
    //           }}
    //         >
    //           {this.props.movie.originalTitle.toUpperCase()}
    //         </Text>
    //       </View>
    //       <View><Text>{this.props.movie.overview}</Text></View>
    //       <View><Text>{this.props.movie.release.releaseDate}</Text></View>
    //       <View><Text>{this.props.movie.statusList}</Text></View>

    //       <View>
    //         <Text>
    //           À l'affiche dans
    //           {" "}
    //           {this.props.movie.statistics.theaterCount}
    //           {" "}
    //           Salles
    //         </Text>
    //       </View>
    //       <View>

    //         <Text>
    //           <Icon name={"ios-star"} color={Global.goldColor} />
    //           Allociné:
    //           {" "}
    //           {_.round(this.props.movie.statistics.userRating * 2, 1)}
    //           /10
    //         </Text>
    //       </View>
    //       <View>
    //         <Text
    //           style={{ textAlign: "center", padding: 10, lineHeight: 18 }}
    //           onPress={this.toggleView}
    //           numberOfLines={this.state.expandText ? 100 : 4}
    //         >
    //           {this.props.movie.synopsis}
    //         </Text>
    //       </View>

    //       <View><Text>{this.props.movie.rating} voters</Text></View>
    //       <View style={{ position: "absolute", top: 10, right: 10 }}>
    //         <Fav movieId={this.props.movie._id} />
    //       </View>
    //       <View style={{ marginTop: 20 }}>
    //         <Text onPress={() => console.log("view pressed")}>
    //           Voir les horaires dans les cinémas autour de moi
    //         </Text>
    //         <Text onPress={() => console.log("view pressed")}>
    //           Trouver un buddy pour ce film
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </ScrollView>
  }
}
