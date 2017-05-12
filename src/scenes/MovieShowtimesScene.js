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
import ShowtimeCard from "../components/products/ShowtimeCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import Button from "../components/core/Button";
import Fav from "../components/core/Fav";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import Accordion from "react-native-collapsible/Accordion";

const SECTIONS = [
  {
    title: "First",
    content: "Lorem ipsum..."
  },
  {
    title: "Second",
    content: "Lorem ipsum..."
  }
];

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
          </Text>
          {movie.scr.map((date, index1) => {
            return (
              <View style={{ flexDirection: "row" }} key={index1}>
                <Text key={index1} style={{ fontSize: 14 }}>
                  {date.d.split("-").reverse().join("/")}{"\n"}
                  <View
                    key={index1}
                    style={{
                      height: 40,
                      width: 0,
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    {date.t.map((time, index2) => {
                      return (
                        <View style={{ height: 30, width: 40, margin: 10 }}>
                          <Text
                            style={{ textAlign: "center", paddingTop: 2 }}
                            key={index2}
                          >
                            {time.$}
                          </Text>
                        </View>
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
    return (
      <ScrollView style={{ marginTop: 70 }}>
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
