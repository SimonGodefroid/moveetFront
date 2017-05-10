import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  ScrollView,
  Image,
  Dimensions,
  Text,
  View,
  Platform
} from "react-native";
import Api from "../Api.js";
import Icon from "../components/core/Icon";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import UserCard from "../components/products/UserCard";
import Fav from "../components/core/Fav";
import _ from "lodash";
import { TabViewAnimated, TabBar } from "react-native-tab-view";

let {
  height,
  width
} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    alignItems: "center"
  }
});

export default class BuddyFinderScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buddiesFoundData: [],
      buddiesFound: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    Api.buddyFinder(
      this.props.movie._id,
      Api.getUser()._id,
      buddiesFoundList => {
        this.setState({
          buddiesFoundData: buddiesFoundList.buddiesFound,
          buddiesFound: this.state.buddiesFound.cloneWithRows(
            buddiesFoundList.buddiesFound
          )
        });
        console.log(buddiesFoundList);
      }
    );
  }

  renderUserCard(rowData) {
    return (
      <TouchableOpacity
        onPress={() => Actions.userprofile({ userData: rowData })}
      >
        <UserCard
          username={rowData.account.username}
          age={rowData.account.age}
          genre={rowData.account.genre}
          color={"rgba(100,200,126, 0.35)"}
          picture={
            rowData.account.picture === ""
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBtiZXuF2iXY7y5Z3HRCRVs1WJj0i6f8f0ueX3VIJo-PpUk8vi"
              : rowData.account.picture
          }
          distance={Api.getDistanceFromLatLonInKm(
            rowData.account.location.latitude,
            rowData.account.location.longitude,
            Api.getUser().account.location.latitude,
            Api.getUser().account.location.longitude
          )}
        />
      </TouchableOpacity>
    );
  }

  renderListView(data, dataCondition) {
    console.log("coucou render listview");
    if (Object.keys(dataCondition).length === 0) {
      return (
        <View>
          <Text style={{ marginTop: 200, padding: 4, textAlign: "center" }}>
            Oups ! Personne n'a ajouté ce film à leur pipeline. Ajoute-le pour pouvoir être trouvé plus tard par d'autres buddies !
          </Text>
          <View style={{ alignItems: "center" }}>
            <Fav movieId={this.props.movie._id} size={100} />
          </View>
        </View>
      );
    }
    if (Object.keys(dataCondition).length > 0) {
      console.log("coucou listview");
      return (
        <ScrollView>
          <Text style={{ textAlign: "center", padding: 4 }}>Buddies Found</Text>
          <ListView
            dataSource={data}
            renderRow={rowData => this.renderUserCard(rowData)}
          />
        </ScrollView>
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView style={{ marginTop: Platform.OS === "ios" ? 70 : 0 }}>
        <View>
          {this.renderListView(
            this.state.buddiesFound,
            this.state.buddiesFoundData
          )}
        </View>
      </ScrollView>
    );
  }
}
