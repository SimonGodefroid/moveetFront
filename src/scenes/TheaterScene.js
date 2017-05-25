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
      showtimesData: [],
      showtimes: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      Api.updateUserLocation(position);
      Api.getTheaterShowtime(
        this.props.theater.code,
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        showTimesList => {
          this.setState({
            showtimesData: showTimesList.showtimes.feed.theaterShowtimes,
            showtimes: this.state.showtimes.cloneWithRows(
              showTimesList.showtimes.feed.theaterShowtimes
            )
          });
        }
      );
    });
  }

  render() {
    console.log("theater scene this.props", this.props);
    console.log("theater this state", this.state);
    return (
      <Image
        style={{
          marginTop: 70,
          margin: 5,
          height: height - 50,
          width: width - 10,
          flex: 1
        }}
        source={{
          uri: !this.props.theater.picture
            ? ""
            : this.props.theater.picture.href
        }}
      >

        <ScrollView>
          <View
            style={{
              marginTop: height / 8 - 50,
              alignItems: "center",
              width: width,
              backgroundColor: "rgba(255, 255, 255,0.9)"
            }}
          >
            <View>
              <Text style={{ marginTop: 10, fontSize: 20 }}>
                {this.props.theater.name.toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={{ marginVertical: 4 }}>
                {this.props.theater.address}
              </Text>
            </View>

            <View style={{ marginTop: 10, width: width - 20 }} />

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
