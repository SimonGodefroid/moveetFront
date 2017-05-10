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
//import MovieCard from "../components/products/MovieCard";
import MovieQuickCard from "../components/products/MovieQuickCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import Button from "../components/core/Button";
import Fav from "../components/core/Fav";
import Tinder from "../components/core/Tinder";

let {
  height,
  width
} = Dimensions.get("window");

export default class SwiperMoviesScene extends React.Component {
  render() {
    return <Tinder style={{ flex: 1 }} />;
  }
}
