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
import Global from "../Global.js";
import Api from "../Api.js";
import MovieCard from "../components/products/MovieCard";
import IconMaterialCommunityIcons
  from "react-native-vector-icons/MaterialCommunityIcons";
import Avatar from "../components/user/Avatar";
import Loading from "../components/core/Loading";
import { Actions } from "react-native-router-flux";
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
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class ResultsScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: "1", title: "En Salles" },
        { key: "2", title: "À Venir" }
      ],
      comingSoonMoviesData: [],
      comingSoonMovies: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      nowShowingMoviesData: [],
      nowShowingMovies: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    Api.getSortedMovies(this.props.genre, moviesList => {
      // console.log("Results#getMovies: ", moviesList);
      this.setState({
        comingSoonMoviesData: moviesList.comingSoonMovies,
        comingSoonMovies: this.state.comingSoonMovies.cloneWithRows(
          moviesList.comingSoonMovies
        ),
        nowShowingMoviesData: moviesList.nowShowingMovies,
        nowShowingMovies: this.state.nowShowingMovies.cloneWithRows(
          moviesList.nowShowingMovies
        )
      });
    });
  }

  _handleChangeTab = index => {
    this.setState({ index });
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "red" }}
        labelStyle={{ color: "white" }}
      />
    );
  };

  _renderScene = ({ route }) => {

    switch (route.key) {
      case "1":
        if (this.state.nowShowingMoviesData.length <= 0) {
          return (<Loading />)
        }
        return (
          <View style={styles.page}>
            <ListView
              dataSource={this.state.nowShowingMovies}
              renderRow={rowData => this.renderMovieCard(rowData)}
            />

          </View>
        );
      case "2":
        if (this.state.comingSoonMoviesData.length <= 0) {
          return (<Loading />)
        }
        return (
          <View style={styles.page}>
            <ListView
              dataSource={this.state.comingSoonMovies}
              renderRow={rowData => this.renderMovieCard(rowData)}
            />
          </View>
        );
      default:
        return null;
    }
  };

  renderStatusList(movie) {
    if (movie.statusList === "comingsoon") {
      return (
        <Text
          style={{
            color: Global.moveetRed,
          }}
        >
          Bientôt à l'affiche
        </Text>
      );
    }
    return (
      <Text
        style={{
          color: "black",
        }}
      >
        Dans {movie.statistics.theaterCount} salles
      </Text>
    );
  }

  // renderGenre(rowData) {
  //   const genres = rowData.genreList.map((genre, index) => (
  //     <View key={index}><Text style={{ color: "white" }}>{genre}</Text></View>
  //   ));
  //   return <View>{genres}</View>;
  // }


  renderMovieCard(rowData) {
    return (
      <TouchableOpacity onPress={() => Actions.movie({ movie: rowData })}>
        <View style={{ position: "relative" }}>
          <MovieCard
            poster={rowData.posterPath}
            title={rowData.originalTitle}
            rating={rowData.statistics.userRating}
            id={rowData._id}
            movieId={rowData.code}
            releaseDate={rowData.release.releaseDate}
            synopsis={rowData.synopsis}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 6,
            left: 140,
            flexDirection: "row",
            zIndex: 20,
            //            backgroundColor: 'black',
            borderRadius: 14,
            paddingHorizontal: 6,
            paddingVertical: 4,
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: 1,
          }}
        >
          {this.renderStatusList(rowData)}
        </View>
        <View>
          <Text
            style={{
              position: 'absolute',
              right: 12,
              bottom: 8,
              zIndex: 100000,
              backgroundColor: "transparent",
              fontWeight: 'bold'
            }}
          >
            {!isNaN(rowData.statistics.userRating * 2)
              ? (rowData.statistics.userRating * 2).toFixed(1)
              : ""}
          </Text>
        </View>
        <IconMaterialCommunityIcons
          name={"popcorn"}
          size={40}
          color={
            rowData.statistics.userRating * 2 < 7 ? "orange" : Global.heartColor
          }
          style={{ position: "absolute", zIndex: -10, right: 4, bottom: 20 }}
        />
      </TouchableOpacity >
    );
  }

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, { marginTop: 64 }]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}
