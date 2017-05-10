import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Text,
  View
} from "react-native";
import Api from "../Api.js";
import GenreTab from "../components/products/GenreTab";
import Images from "../components/core/Images";
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
          backgroundColor: "#000",
          marginTop: 38
        }}
      >
        <View style={styles.container}>
          <GenreTab text={"ACTION"} image={Images.searchAction} genre={1} />
          <GenreTab
            text={"ANIMATION"}
            image={Images.searchAnimation}
            genre={3}
          />
          <GenreTab text={"COMEDIE"} image={Images.searchComedy} genre={4} />
          <GenreTab text={"DRAME"} image={Images.searchDrama} genre={2} />
          <GenreTab text={"HORREUR"} image={Images.searchHorror} genre={6} />
          <GenreTab text={"ROMANCE"} image={Images.searchRomance} genre={8} />
          <GenreTab
            text={"SCI-FI\n&\nFANTASTIQUE"}
            image={Images.searchSciFi}
            genre={7}
          />
          <GenreTab
            text={"THRILLER\n&\nCRIME"}
            image={Images.searchThriller}
            genre={5}
          />
          {/*<GenreTab text={"AUTRES"} genre={9} />*/}
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
