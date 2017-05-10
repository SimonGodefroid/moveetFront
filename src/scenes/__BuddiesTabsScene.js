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
import Icon from "../components/core/Icon";
import { Actions } from "react-native-router-flux";
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
      index: 0,
      // routes: [
      //   { key: "1", title: "Buddies" },
      //   { key: "2", title: "Explorer" },
      //   { key: "3", title: "Matches" }
      // ],
      // buddiesRequestsSentData: [],
      // buddiesRequestsSent: new ListView.DataSource({
      //   rowHasChanged: (r1, r2) => r1 !== r2
      // }),
      // buddiesRequestsReceivedData: [],
      // buddiesRequestsReceived: new ListView.DataSource({
      //   rowHasChanged: (r1, r2) => r1 !== r2
      // }),
      // buddiesData: [],
      // buddies: new ListView.DataSource({
      //   rowHasChanged: (r1, r2) => r1 !== r2
      // }),
      // matchesData: [],
      // matches: new ListView.DataSource({
      //   rowHasChanged: (r1, r2) => r1 !== r2
      // }),
      allUsersData: [],
      allUsers: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    // Api.getBuddies(Api.getUser()._id, buddiesList => {
    //   this.setState({
    //     buddiesRequestsSentData: buddiesList.userInfo.account.buddiesRequestsSent,
    //     buddiesRequestsSent: this.state.buddiesRequestsSent.cloneWithRows(
    //       buddiesList.userInfo.account.buddiesRequestsSent
    //     ),
    //     buddiesRequestsReceivedData: buddiesList.userInfo.account.buddiesRequestsReceived,
    //     buddiesRequestsReceived: this.state.buddiesRequestsReceived.cloneWithRows(
    //       buddiesList.userInfo.account.buddiesRequestsReceived
    //     ),
    //     buddiesData: buddiesList.userInfo.account.buddies,
    //     buddies: this.state.buddies.cloneWithRows(
    //       buddiesList.userInfo.account.buddies
    //     )
    //   });
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
    if (!dataCondition) {
      return <View><Text>nothing to render</Text></View>;
    }
    if (Object.keys(dataCondition).length > 0) {
      return (
        <ListView
          dataSource={data}
          renderRow={rowData => this.renderUserCard(rowData)}
        />
      );
    }
  }

  // _handleChangeTab = index => {
  //   this.setState({ index });
  // };

  // _renderHeader = props => {
  //   return <TabBar {...props} />;
  // };

  // _renderScene = ({ route }) => {
  //   switch (route.key) {
  //     case "1":
  //       return (
  //         <ScrollView>
  //           <View style={styles.page}>
  //             <Text>Buddies</Text>
  //             {this.renderListView(this.state.buddies, this.state.buddies)}

  //             <Text>Buddies Requests Pending</Text>
  //             {this.renderListView(
  //               this.state.buddiesRequestsReceived,
  //               this.state.buddiesRequestsReceivedData
  //             )}

  //             {this.renderListView(
  //               this.state.buddiesRequestsSent,
  //               this.state.buddiesRequestsSentData
  //             )}

  //           </View>
  //         </ScrollView>
  //       );
  //     case "2":
  //       return (
  //         <View>
  //           {this.renderListView(this.state.allUsers, this.state.allUsersData)}
  //         </View>
  //       );
  //     case "3":
  //       return (
  //         <View style={[styles.page, { backgroundColor: "white" }]}>
  //           {this.renderListView(this.state.matches, this.state.matchesData)}
  //         </View>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  render() {
    return (
      <ScrollView>
        <View>
          <Text>All Users</Text>
          {this.renderListView(this.state.allUsers, this.state.allUsersData)}
        </View>
        <View style={[styles.page, { backgroundColor: "white" }]}>
          <Text>Matches</Text>
          {this.renderListView(this.state.matches, this.state.matchesData)}
        </View>
      </ScrollView>
    );
    {
      /*<TabViewAnimated
      style={[styles.container, { marginTop: 64 }]}
      navigationState={this.state}
      renderScene={this._renderScene}
      renderHeader={this._renderHeader}
      onRequestChangeTab={this._handleChangeTab}
    />*/
    }
  }
}
