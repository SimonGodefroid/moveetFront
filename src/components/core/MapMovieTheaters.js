import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Api from "../../Api";
import Map from "react-native-maps";
import MyCustomCalloutViewTheater from "./MyCustomCalloutViewTheater";
import Loading from "../core/Loading";

export default class MapMovieTheaters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTheaters: []
    };
  }

  //`http://api.allocine.fr/rest/v3/theaterlist?partner=YW5kcm9pZC12Mg&long=${long}&lat=${lat}&radius=20&count=500&format=json`
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      fetch(
        `http://api.allocine.fr/rest/v3/theaterlist?partner=YW5kcm9pZC12Mg&long=${position.coords.longitude}&lat=${position.coords.latitude}&radius=20&count=10&format=json`
      )
        .then(res => res.json())
        .then(theaters => {
          console.log("theaters fetched", theaters);
          this.setState({
            allTheaters: theaters.feed.theater
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  renderTheaterMarkers(theaters) {

    console.log("this.state.allUsers", this.state.allTheaters);
    //console.log("coucou render theater marker");
    if (this.state.allTheaters) {
      const theatersMarkers = theaters.map((theater, index) => (
        <Map.Marker
          title={theater.name}
          description={`${theater.address}, ${theater.city}`}
          coordinate={{
            latitude: theater.geoloc.lat,
            longitude: theater.geoloc.long
          }}
          key={index}
          onPress={() => {
            console.log("marker pressed");
          }}
        >
          <Map.Callout>
            <MyCustomCalloutViewTheater {...theater} />
          </Map.Callout>
        </Map.Marker>
      ));

      return theatersMarkers;
    }
  }

  renderTheaterMap() {
    //console.log("this.props.latitude", this.props.latitude);
    //console.log("this.props.longitude", this.props.longitude);

    return (
      <View style={{ marginTop: 0 }}>
        <Map
          style={styles.mapview}
          showsUserLocation={true} // remember to set a custom location
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          // region est utilisé pour centrer la map sur l'utilisateur !!! ARCHI IMPORTANT
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          {this.renderTheaterMarkers(this.state.allTheaters)}

        </Map>
      </View>
    );
  }

  render() {
    if (this.state.allTheaters.length <= 0) {
      return (<Loading />)
    }
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Text>Les Cinémas autour de vous</Text>
        </View>
        {this.renderTheaterMap()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100
  }
});
