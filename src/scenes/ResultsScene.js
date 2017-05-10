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
import MovieCard from "../components/products/MovieCard";
import Avatar from "../components/user/Avatar";
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
      console.log("Results#getMovies: ", moviesList);
      this.setState({
        comingSoonMoviesData: moviesList.comingSoonMovies,
        comingSoonMovies: this.state.comingSoonMovies.cloneWithRows(
          moviesList.comingSoonMovies
        ),
        nowShowingMoviesData: moviesList.nowShowingMoviesData,
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
    return <TabBar {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "1":
        return (
          <View style={styles.page}>

            <ListView
              dataSource={this.state.nowShowingMovies}
              renderRow={rowData => this.renderMovieCard(rowData)}
            />

          </View>
        );
      case "2":
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
        <View style={{ position: "absolute", bottom: 20, left: 150 }}>
          <Text>{rowData.statusList}</Text>
          <Text>{rowData.statistics.userRating * 2}</Text>
        </View>
      </TouchableOpacity>
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
