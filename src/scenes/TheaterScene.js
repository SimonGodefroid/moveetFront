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
import Loading from "../components/core/Loading";
import Fav from "../components/core/Fav";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import Accordion from "react-native-collapsible/Accordion";

let {
  height,
  width
} = Dimensions.get("window");

export default class TheaterScene extends React.Component {
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
            showtimesData: showTimesList.showtimes.feed.theaterShowtimes[0],
            showtimes: this.state.showtimes.cloneWithRows(
              showTimesList.showtimes.feed.theaterShowtimes[0]
            )
          });
        }
      );
    });
  }
  _renderHeader(section) {
    console.log("coucou theaterscene render header");
    console.log("section.version", section.version);
    console.log("section.screen", section.screen);
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {section.onShow.movie.title}
          -
          {section.version.original === "true" &&
            section.version.$ !== "Français"
            ? "VO"
            : "VF"}
          {section.screenFormat.$ === "Numérique" ? "" : section.screenFormat.$}

        </Text>
        <Text style={{ textAlign: "center" }}>
          {section.screen ? section.screen.$ : ""}
        </Text>
      </View>
    );
  }

  _renderContent(section) {
    console.log("coucou theaterscene render content");
    const screenings = section.scr.map((movie, index) => {
      return (
        <View key={index}>
          <Text key={index}>{movie.d}</Text>
          {movie.t.map((time, index2) => {
            return <Text key={index2}>{time.$}</Text>;
          })}
        </View>
      );
    });
    return (
      <View style={[styles.content, { marginHorizontal: 10 }]}>
        <Text style={{ padding: 10 }}>
          {section.onShow.movie.title}

        </Text>
        {screenings}
      </View>
    );
  }

  render() {
    console.log("coucou theaterScene");

    if (Object.keys(this.state.showtimesData).length === 0) {
      return <Loading />;
    }
    return (
      <Image
        style={{
          margin: 5,
          height: height - 50,
          width: width - 10,
          flex: 1
        }}
        source={{ uri: this.props.theater.picture.href }}
      >
        <ScrollView style={{ marginTop: 70 }}>

          <Accordion
            sections={this.state.showtimesData["movieShowtimes"]}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />

        </ScrollView>
      </Image>
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
    fontSize: 14,
    fontWeight: "500"
  },
  content: {
    paddingBottom: 10,
    backgroundColor: "rgba(255,255,255,0.6)"
  },
  active: {
    backgroundColor: "rgba(255,255,255,0.3)"
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
