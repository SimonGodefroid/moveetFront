import React, { Component } from "react";

import {
  Alert,
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
import Config from "../Config.js";
import Global from "../Global.js";
import MovieCard from "../components/products/MovieCard";
import Loading from "../components/core/Loading";
import ShowtimeCard from "../components/products/ShowtimeCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import Button from "../components/core/Button";
import Fav from "../components/core/Fav";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import Accordion from "react-native-collapsible/Accordion";

let {
  height,
  width
} = Dimensions.get("window");

export default class MovieShowtimesScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieShowtimesData: [],
      movieShowtimes: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    // Alert.alert("componentDidMount moviesShowtimesScene");
    // navigator.geolocation.getCurrentPosition(position => {
    //   Alert.alert("position", JSON.stringify(position));
    //   fetch(
    //     `${Config.host}/api/user/${Api.getUser()._id}/updateLocation/?lat=${position.coords.latitude}&long=${position.coords.longitude}&timestamp=${position.timestamp}`,
    //     {
    //       method: "POST"
    //     },
    //     console.log("coucou", position)
    //   );
    // });
    navigator.geolocation.getCurrentPosition(position => {
      Api.updateUserLocation(position);
      Api.getMovieShowtime(
        this.props.movie.code,
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        movieShowTimesList => {
          this.setState({
            movieShowtimesData: movieShowTimesList.showtimes.feed.theaterShowtimes,
            movieShowtimes: this.state.movieShowtimes.cloneWithRows(
              movieShowTimesList.showtimes.feed.theaterShowtimes
            )
          });
        }
      );
    });
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {section.place.theater.name}
          ,
          {" "}
          {section.place.theater.postalCode}
          ,
          {" "}{Math.round(section.place.theater.distance * 10) / 10}{" km"}
        </Text>
      </View>
    );
  }

  _renderContent(section) {
    console.log("section", section);
    const screenings = section.movieShowtimes.map((movie, index) => {
      return (
        <View key={index}>
          <Text
            style={{
              textAlign: "center",
              backgroundColor: "black",
              color: "white",
              marginBottom: 5
            }}
          >
            {movie.version.$}
            {" "}
            -
            {" "}
            {movie.version.original === "true" && movie.version.$ !== "Français"
              ? "VO"
              : "VF"}
          </Text>
          {movie.scr.map((date, index1) => {
            return (
              <View key={index1}>
                <Text key={index1} style={{ fontSize: 14 }}>
                  {date.d.split("-").reverse().join("/")}{"\n"}
                  <View
                    key={index1}
                    style={{
                      height: 40,
                      width: width,

                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    {date.t.map((time, index2) => {
                      return (
                        <Text
                          style={{
                            textAlign: "center",
                            height: 20,
                            width: 60
                          }}
                          key={index2}
                          onPress={() =>
                            console.log(
                              "time.$ from accordion",
                              time.$,
                              time.code
                            )}
                        >
                          {time.$}
                        </Text>
                      );
                    })}
                  </View>
                </Text>
              </View>
            );
          })}

        </View>
      );
    });

    return (
      <View style={[styles.content, { marginHorizontal: 10 }]}>
        <Text style={{ padding: 10 }}>
          {section.place.theater.address}

          ,
          {" "}
          {section.place.theater.city}
          ,
          {" "}
          {section.place.theater.postalCode}
          {" "}

        </Text>
        <View style={{ justifyContent: "center" }}>
          {screenings}
        </View>
      </View>
    );
  }

  render() {
    console.log("movie showtimes this props", this.props);
    if (Object.keys(this.state.movieShowtimesData).length === 0) {
      return <Loading />;
    }
    return (
      <ScrollView style={{ marginTop: 70 }}>
        <Text style={{ textAlign: "center" }}>
          Séances pour {this.props.movie.originalTitle}
        </Text>
        <Accordion
          sections={this.state.movieShowtimesData}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
    marginBottom: 10
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500"
  },
  content: {
    paddingBottom: 10,
    backgroundColor: "#fff"
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  inactive: {
    backgroundColor: "rgba(245,252,255,1)"
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10
  },
  activeSelector: {
    fontWeight: "bold"
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10
  }
});
