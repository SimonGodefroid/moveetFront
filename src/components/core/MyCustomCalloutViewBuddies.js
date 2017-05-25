import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  Modal
} from "react-native";
import Global from "../../Global";
import Avatar from "../user/Avatar";
import { Actions } from "react-native-router-flux";

export default class MyCustomCalloutViewBuddies extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => Actions.userprofile({ userData: this.props })}
        style={{ width: 230, padding: 5 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            height={30}
            width={30}
            picture={this.props.account.picture}
            borderRadius={15}
          />
          <Text style={{ paddingHorizontal: 10 }}>
            {this.props.account.username}
            ,
            {" "}
            {this.props.account.genre.substring(0, 1)}
            ,
            {" "}
            {this.props.account.age} ans,
            {" "}{this.props.account.favorites.length} films
          </Text>
        </View>
        <View>
          <Text style={{ paddingTop: 10, fontSize: 12 }}>
            {!this.props.account.favorites[0]
              ? ""
              : this.props.account.favorites[0]["originalTitle"]}
            {"\n"}
            {!this.props.account.favorites[1]
              ? ""
              : this.props.account.favorites[1]["originalTitle"]}
            {"\n"}
            {!this.props.account.favorites[2]
              ? ""
              : this.props.account.favorites[2]["originalTitle"]}
          </Text>
        </View>

      </TouchableOpacity>
    );
  }
}
