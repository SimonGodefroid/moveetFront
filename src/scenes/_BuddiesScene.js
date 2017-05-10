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
  Button
} from "react-native";
import Api from "../Api.js";
import MovieCard from "../components/products/MovieCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import Fav from "../components/core/Fav";
import _ from "lodash";

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
    justifyContent: "center"
  }
});

export default class BuddiesScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buddiesRequestsData: [],
      buddiesRequests: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {}

  acceptBuddyRequest(userId, buddyId, callback) {
    console.log("coucou acceptBuddyRequest");
    fetch(`${Config.host}/api/user/${userId}/acceptBuddyRequest/${buddyId}`, {
      method: "POST"
    });
    this.setState({});
  }

  renderBuddy(rowData) {
    console.log("renderBuddy$rowData", rowData);
    return (
      <View style={[styles.page, { backgroundColor: "#ff4081" }]}>
        <View style={{ padding: 20 }}>
          <Text>{rowData.account.username}</Text>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              padding: 10,
              width: 100,
              height: 40
            }}
            onPress={() =>
              this.acceptBuddyRequest(Api.getUser()._id, rowData._id)}
          >
            <Text>
              Accepter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ padding: 10 }}>
          <Text>Ces buddies sont en attente de ta réponse:</Text>
          <ListView
            dataSource={this.state.buddiesRequests}
            renderRow={rowData => this.renderBuddy(rowData)}
          />
        </View>
      </View>
    );
  }
}
