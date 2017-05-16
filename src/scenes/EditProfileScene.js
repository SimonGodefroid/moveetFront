import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ListView,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  Picker,
  Text,
  View
} from "react-native";
import Api from "../Api.js";
import {
  KeyboardAwareScrollView
} from "react-native-keyboard-aware-scroll-view";
//import MovieCard from "../components/products/MovieCard";
import MovieQuickCard from "../components/products/MovieQuickCard";
import Avatar from "../components/user/Avatar";
import Icon from "../components/core/Icon";
import Swiper from "react-native-swiper";
import { Actions } from "react-native-router-flux";
import Global from "../Global";
import Config from "../Config";
import Fav from "../components/core/Fav";
import _ from "lodash";
import ImagePicker from "react-native-image-crop-picker";

let {
  height,
  width
} = Dimensions.get("window");

export default class EditProfileScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expandText: false,
      userProfileInfo: [],
      userFavoriteMovies: [],
      image: null,
      images: null,
      description: this.props.userData.account.description,
      username: this.props.userData.account.username,
      age: this.props.userData.account.age,
      genre: this.props.userData.account.genre
    };

    this.toggleView = this.toggleView.bind(this);
  }
  DESCRIPTION = this.props.userData.account.description;

  // permet de trouver si la search value apparait dans les valeurs d'un objet. Ici le but est de chercher si le buddy de la rowData est contenu dans le tableau des buddies, buddies requests ou buddies pending du user connecté
  mapObjectValue(object) {
    let result = object
      .map(function(x) {
        return x._id.toString();
      })
      .indexOf(this.props.userData._id) === -1
      ? false
      : true;
    return result;
  }

  componentDidMount() {
    Api.getBuddies(Api.getUser()._id, userProfileInfo => {
      this.setState({
        userProfileInfo: userProfileInfo.userInfo
      });
    });
  }

  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: "MediumQuality"
    })
      .then(image => {
        console.log("received image", image);
        console.log("before saveuserimage", image.path);
        Api.saveUserImage(image.path);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          },
          images: null
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  scaledHeight(oldW, oldH, newW) {
    return oldH / oldW * newW;
  }

  toggleView() {
    this.setState({
      expandText: !this.state.expandText
    });
  }

  render() {
    console.log("UserProfileScene$userData", this.props.userData);
    console.log("this.state.username", this.state.username);
    console.log("this.state.genre", this.state.genre);
    if (Object.keys(this.state.userProfileInfo).length <= 0) {
      return <View style={{ marginTop: 60 }}><Text>Loading...</Text></View>;
    } else {
      return (
        <KeyboardAwareScrollView
          style={{
            marginTop: 60,
            position: "relative"
            //backgroundColor: "blue"
          }}
        >
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => this.pickSingle(true)}
            >
              <Avatar
                height={150}
                width={150}
                borderRadius={75}
                picture={
                  this.state.image === null
                    ? this.props.userData.account.picture
                    : this.state.image.uri
                }
              />
              <Text
                style={{
                  position: "absolute",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  bottom: 0,
                  width: 200,
                  textAlign: "center",
                  height: 30
                }}
              >
                Changer
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 40 }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30
              }}
            >
              <Text style={{ marginTop: 20 }}>Votre prénom:</Text>
              <TextInput
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                style={{
                  height: 50,
                  width: 200,
                  paddingLeft: 20,
                  borderWidth: 2,
                  //borderStyle: "solid",
                  borderColor: "black",
                  marginLeft: 25,
                  borderRadius: 20,
                  backgroundColor: "transparent",
                  marginBottom: -20
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30
                //marginHorizontal: 20,
                //alignItems: "center",
                //justifyContent: "center"
              }}
            >
              <Text style={{ marginTop: 20 }}>Votre age:</Text>
              <TextInput
                value={this.state.age.toString()}
                onChangeText={age => this.setState({ age })}
                keyboardType="numbers-and-punctuation"
                style={{
                  height: 50,
                  paddingLeft: 20,
                  borderWidth: 2,

                  width: 60,
                  //borderStyle: "solid",
                  borderColor: "black",
                  marginLeft: 50,
                  borderRadius: 20,
                  backgroundColor: "transparent",
                  marginBottom: -20
                }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: 200
              }}
            >
              <Text>Votre genre:</Text>
              <Picker
                style={{ width: 100, marginLeft: 30 }}
                selectedValue={this.state.genre}
                onValueChange={genre => this.setState({ genre: genre })}
              >
                <Picker.Item label="Homme" value="Homme" />
                <Picker.Item label="Femme" value="Femme" />
              </Picker>
            </View>
          </View>
          <Text
            style={{
              marginTop: -30,
              marginLeft: 40,
              paddingTop: 20
            }}
          >
            A propos de vous:{"\n"}{"\n"}

          </Text>
          <TextInput
            value={this.state.description}
            placeholder={this.props.userData.account.description}
            onChangeText={description => this.setState({ description })}
            multiline={true}
            style={{
              height: 200,
              fontSize: 14,
              marginHorizontal: 20,
              padding: 10,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: "black",
              borderRadius: 30,
              marginBottom: 20
            }}
          />
          <TouchableOpacity
            onPress={() => Actions.editprofile({})}
            style={{
              //marginRight: 100,
              //marginLeft: 100,

              height: 50,
              margin: 50,
              marginTop: 5,
              alignItems: "center",
              backgroundColor: Global.moveetColor,
              borderRadius: 25,
              borderWidth: 5,
              borderColor: Global.moveetColor,
              marginBottom: 15
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 10
              }}
            >
              Sauver les changements
            </Text>
          </TouchableOpacity>

        </KeyboardAwareScrollView>
      );
    }
  }
}

var styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD6EB"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
