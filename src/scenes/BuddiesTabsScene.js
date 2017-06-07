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
import Loading from "../components/core/Loading";
import Global from "../Global";
import Config from "../Config";
import UserCard from "../components/products/UserCard";
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

export default class BuddiesTabsScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matchesData: [],
      matches: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      allUsersData: [],
      allUsers: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    // this.setState({
    //   userId: Api.getUser()._id
    // });
    Api.getAllUsers(Api.getUser()._id, allUsersList => {
      this.setState({
        allUsersData: allUsersList.usersInfo,
        allUsers: this.state.allUsers.cloneWithRows(allUsersList.usersInfo)
      });
    });
    Api.getMatches(Api.getUser()._id, matchesList => {
      this.setState({
        matchesData: matchesList.userMatches,
        matches: this.state.matches.cloneWithRows(matchesList.userMatches)
      });
    });
  }

  renderUserCard(rowData) {
    return (
      <TouchableOpacity
        onPress={() => Actions.userprofile({ userData: rowData })}
      >
        <UserCard
          username={rowData.account.username}
          favoritesNum={rowData.account.favorites.length}
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
          favorites={rowData.account.favorites}
        />
      </TouchableOpacity>
    );
  }

  renderListView(data, dataCondition) {
    if (Object.keys(dataCondition).length > 0) {
      return (
        <ListView
          dataSource={data}
          renderRow={rowData => this.renderUserCard(rowData)}
        />
      );
    }
  }

  render() {
    console.log("buddyscene user loc", !Api.getUser().account.location);
    console.log("this.state.matchesData", this.state.matchesData);
    if (this.state.allUsersData.length <= 0) {
      return (<Loading />)
    }
    return (
      <ScrollView style={{ marginTop: Platform.OS === "ios" ? 70 : 0 }}>
        <View style={[styles.page, { backgroundColor: "white" }]}>
          <Text style={{ textAlign: "center", padding: 4 }}>Matches</Text>
          {this.renderListView(this.state.matches, this.state.matchesData)}
        </View>
        <View>
          <Text style={{ textAlign: "center", padding: 4 }}>All Users</Text>
          {this.renderListView(this.state.allUsers, this.state.allUsersData)}
        </View>
      </ScrollView>
    );
  }
}
