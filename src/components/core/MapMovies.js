import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Api from "../../Api";
import Map from "react-native-maps";

export default class MapMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 48.8227383,
      longitude: 2.3447517,
      allUsers: []
    };
  }

  componentDidMount() {
    Api.getAllUsers(Api.getUser()._id, allUsersList => {
      this.setState({
        allUsers: allUsersList.usersInfo
      });
    });
  }

  renderUserMarkers(users) {
    console.log("this.state.allUsers", this.state.allUsers);
    console.log("coucou render user marker");
    const usersMarkers = users.map((user, index) => (
      <Map.Marker
        title={user.account.username}
        coordinate={{
          latitude: user.account.location.latitude,
          longitude: user.account.location.longitude
        }}
        key={index}
      />
    ));

    return usersMarkers;
  }
  render() {
    return (
      <View style={{ marginTop: 200 }}>
        <Map
          style={styles.mapview}
          showsUserLocation={true} // remember to set a custom location
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          {this.renderUserMarkers(this.state.allUsers)}

        </Map>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.33
  }
});
