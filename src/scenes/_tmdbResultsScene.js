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

let {
  height,
  width
} = Dimensions.get("window");

export default class ResultsScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      moviesData: [],
      movies: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    Api.getMovies(this.props.genre, moviesList => {
      console.log("Results#getMovies: ", moviesList);
      this.setState({
        moviesData: moviesList.movies,
        movies: this.state.movies.cloneWithRows(moviesList.movies)
      });
    });
  }

  renderMovieCard(rowData) {
    return (
      <TouchableOpacity onPress={() => Actions.movie({ movie: rowData })}>
        {console.log(rowData)}
        <View style={{ position: "relative" }}>
          <MovieCard
            poster={`https://image.tmdb.org/t/p/w1000${rowData.poster_path}`}
            title={rowData.title}
            rating={rowData.title}
            id={rowData._id}
            voteAverage={rowData.vote_average}
            voteCount={rowData.vote_count}
            backdropPath={rowData.backdrop_path}
            originalLanguage={rowData.original_language}
            originalTitle={rowData.original_title}
            id={rowData.id}
            releaseDate={rowData.release_date}
            overview={rowData.overview}
            title={rowData.title}
            type={rowData.type}
          />
        </View>
        <View style={{ position: "absolute", bottom: 20, right: 20 }}>
          <Text>{rowData.type}</Text>
          <Text>{rowData.vote_average}</Text>
          <Avatar />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 30 }}>
        <Text>Results Scene</Text>
        <ListView
          dataSource={this.state.movies}
          renderRow={rowData => this.renderMovieCard(rowData)}
        />
      </ScrollView>
    );
  }
}
