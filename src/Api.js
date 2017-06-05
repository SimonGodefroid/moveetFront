import Config from "./Config";
import Store from "react-native-simple-store";
import { Alert } from "react-native";

class Api {
  constructor() {
    // La classe Api.js conservera un objet `user`, qui contiendra des valeurs null par défaut
    this.user = Object.assign({}, this.defaultUser); // Création d'un clone de l'objet this.defaultUser
    // Note: Object.assign() n'est pas disponible en ES5
  }
  // defaultUser = {
  //   _id: null,
  //   token: null,
  //   account: {
  //     username: null,
  //     favorites: []
  //   }
  // };

  getSortedMovies(genre, callback) {
    console.log("getMovies genre is : ", genre);
    console.log(`${Config.host}/api/movies/sorted/?genre=${genre}`);
    fetch(`${Config.host}/api/movies/sorted/?genre=${genre}`)
      .then(res => res.json())
      .then(movies => {
        console.log("movies", movies);
        callback(movies);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSwiperMoviesDeck(userId, callback) {
    console.log("getSwiper userId", userId);
    console.log(`${Config.host}/api/movies/swiperMoviesDeck/${userId}`);
    fetch(`${Config.host}/api/movies/swiperMoviesDeck/${userId}`)
      .then(res => res.json())
      .then(movies => {
        console.log("movies", movies);
        callback(movies);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMovies(genre, callback) {
    console.log("getMovies genre is : ", genre);
    console.log(Config.host);
    console.log(`${Config.host}/api/movies/?genre=${genre}`);
    fetch(`${Config.host}/api/movies/?genre=${genre}`)
      .then(res => res.json())
      .then(movies => {
        console.log("movies", movies);
        callback(movies);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFavoriteMovies(userId, callback) {
    //console.log("getFavorite userId is : ", userId);
    fetch(`${Config.host}/api/user/${userId}/favorites`)
      .then(res => res.json())
      .then(favorites => {
        //console.log("favorite movies fetched", favorites);
        callback(favorites);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUserLocation(position) {
    fetch(
      `${Config.host}/api/user/${this.getUser()._id}/updateLocation/?lat=${position.coords.latitude}&long=${position.coords.longitude}&timestamp=${position.timestamp}`,
      {
        method: "POST"
      }
    );
  }

  // saveUserImage(imagePath = {}, callback) {
  //   console.log("saveUserImage imagePath", imagePath);
  //   fetch(`${Config.host}/api/user/${this.getUser()._id}/saveUserImage/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       imagePath
  //     })
  //   });
  // }

  saveUserImageBase64(imageBase64 = {}, callback) {
    console.log("saveUserImage imagePath", imageBase64);
    fetch(`${Config.host}/api/user/${this.getUser()._id}/saveUserImageBase64/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageBase64
      })

    });
  }

  saveUserProfile(userInfo, callback) {
    fetch(
      `${Config.host}/api/user/${this.getUser()._id}/updateProfileInformation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userInfo
        })
      }
    )
      .then(res => res.json())
      .then(res => {
        console.log("res", res);
        callback(res);
      });
  }

  buddyFinder(movieId, userId, callback) {
    fetch(`${Config.host}/api/user/buddyFinder/${movieId}/for/${userId}`)
      .then(res => res.json())
      .then(buddiesFound => {
        console.log("buddiesFound for the movie fetched", buddiesFound);
        callback(buddiesFound);
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchUser(userId, callback) {
    console.log("fetchUser userId is : ", userId);
    fetch(`${Config.host}/api/user/show/${userId}`)
      .then(res => res.json())
      .then(user => {
        console.log("user fetched", user);
        callback(user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // http://localhost:3002/api/user/show/58f2042aaad91c68e2733f41
  getBuddies(userId, callback) {
    //console.log("getBuddies userId is : ", userId);
    fetch(`${Config.host}/api/user/show/${userId}`)
      .then(res => res.json())
      .then(buddies => {
        //console.log("buddies fetched", buddies);
        callback(buddies);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAllUsers(userId, callback) {
    //console.log("getAllUsers userId is : ", userId);
    fetch(`${Config.host}/api/user/all?userId=${userId}`)
      .then(res => res.json())
      .then(AllUsers => {
        console.log("AllUsers fetched", AllUsers);
        callback(AllUsers);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMovieShowtime(movieId, location, callback) {
    fetch(
      `${Config.host}/api/movies/showtimes?movie=${movieId}&lat=${location.latitude}&long=${location.longitude}&count=20`
    )
      .then(res => res.json())
      .then(movieShowtimes => {
        console.log(
          "movieShowtimes fetched",
          movieShowtimes.showtimes.feed.theaterShowTimes
        );
        callback(movieShowtimes);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTheaterShowtime(theater, location, callback) {
    console.log("api get theater showtime theate", theater);
    fetch(
      `${Config.host}/api/movies/showtimes?movie=&lat=${location.latitude}&long=${location.longitude}&theaters=${theater}&count=20`
    )
      .then(res => res.json())
      .then(movieShowtimes => {
        console.log("movieShowtimes fetched", movieShowtimes);
        callback(movieShowtimes);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMatches(userId, callback) {
    // console.log("getMatches userId is : ", userId);
    fetch(`${Config.host}/api/user/matches/${userId}`)
      .then(res => res.json())
      .then(matches => {
        console.log("Matches fetched", matches);
        callback(matches);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // créer fetch user qui save et set user

  authenticate(user) {
    Store.save("user", user).then(() => {
      console.log("Saved");
      console.log("Authenticate $ User : ", user);
      this.setUser(user);
    });
  }

  // getUsername() {
  //   const user = this.getUser();
  //   if (user.account) {
  //     if (user.account.username) {
  //       return user.account.username;
  //     }
  //   }
  //   return "";
  // }

  getUser() {
    return this.user;
  }
  setUser(user) {
    this.user = user;
    console.log("Set User user is", this.user);
  }

  signUp(user = {}, callback) {
    fetch(`${Config.host}/api/users/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.authenticate(json);
          console.log("signed-up");
          console.log(json);
          callback(json);
        } else {
          console.log("error", json.error);
          Alert.alert("Cannot create account");
          console.log(json);
        }
      });
  }

  logIn(user = {}, callback) {
    fetch(`${Config.host}/api/users/log_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        if (!json.error) {
          this.authenticate(json);
          console.log("Api$Authenticate = logged");
          console.log(json);
          callback(json);
        } else {
          console.log("error", json.error);
          Alert.alert("Bad login");
          console.log(json);
        }
      });
  }
  logOut(callback) {
    Store.delete("user").then(() => {
      console.log("Deleted");
      callback();
    });
  }
  getStore(callback) {
    Store.get("user").then(user => {
      console.log("getStore User ", user);
      callback(user);
    });
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.floor(d);
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
export default new Api();
