import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Text,
  View
} from "react-native";
import Api from "../Api.js";
import SectionTab from "../components/products/SectionTab";
import Images from "../components/core/Images";
import { Actions } from "react-native-router-flux";
let {
  height,
  width
} = Dimensions.get("window");

export default class SearchScene extends React.Component {
  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#000"
        }}
      >
        <View style={styles.container}>

          <TouchableOpacity onPress={() => Actions.buddiestab({})}>
            <SectionTab
              text={"BUDDIES"}
              //image={Images.searchComedy}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Actions.search({
                genre: this.props.genre
              })}
          >
            <SectionTab
              text={"FILMS"}
              //image={Images.searchAction}
              genre={1}
            />
          </TouchableOpacity>
          {/*<TouchableOpacity onPress={() => Actions.results({})}>
            <SectionTab
              text={"ÉVÉNEMENTS"}
              //image={Images.searchDrama}
            />
          </TouchableOpacity>*/}
          {/*<TouchableOpacity onPress={() => Actions.aroundme({})}>
            <SectionTab
              text={"AUTOUR DE MOI"}
              //image={Images.searchHorror}
            />
          </TouchableOpacity>*/}
          <TouchableOpacity onPress={() => Actions.moviesswiper({})}>
            <SectionTab
              text={"MOVIES SWIPER"}
              //image={Images.searchRomance}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 26 : 0,
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

// 1	Action/Aventure
// 2	Drame
// 3	Animation
// 4	Comédie
// 5	Crime/Thriller
// 6	Horreur
// 7	Fantastique/Science-Fiction
// 8	Romance
// 9	Other
