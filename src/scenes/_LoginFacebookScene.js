import React, { Component, PropTypes } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
  ListView,
  TouchableOpacity,
  Alert,
  TextInput,
  Dimensions,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import Api from "../Api";
import Global from "../Global";
import * as Animatable from "react-native-animatable";
import FBSDK, { LoginManager } from "react-native-fbsdk";
import { FBLogin, FBLoginManager } from "react-native-facebook-login";

let {
  height,
  width
} = Dimensions.get("window");

export default class LoginScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "simon@moveet.com",
      password: "password01"
    };
    this.onSubmitPress = this.onSubmitPress.bind(this);
  }

  onSubmitPress() {
    let user = {
      email: this.state.email,
      password: this.state.password
    };
    Api.logIn(user, () =>
      Actions.search({
        type: "replace"
      }));
  }

  renderFacebookLogin() {
    var _this = this;
    return (
      <FBLogin
        style={{
          margin: 20
        }}
        ref={fbLogin => {
          this.fbLogin = fbLogin;
        }}
        permissions={["public_profile"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data) {
          console.log("Logged in!");
          console.log(data.credentials);
          _this.setState({
            user: data.credentials
          });
          Actions.facebookprofilescene({ data: data });
        }}
        onLogout={function() {
          console.log("Logged out.");
          _this.setState({
            user: null
          });
        }}
        onLoginFound={function(data) {
          console.log("Existing login found.");
          console.log(data);
          _this.setState({
            user: data.credentials
          });
        }}
        onLoginNotFound={function() {
          console.log("No user logged in.");
          _this.setState({
            user: null
          });
        }}
        onError={function(data) {
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function() {
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data) {
          console.log("Check permissions!");
          console.log(data);
        }}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <Image
          source={require("../../assets/img/bg-v.png")}
          style={styles.container}
        >
          <StatusBar barStyle="dark-content" />
          <View style={styles.logo_container}>
            <Animatable.Image
              animation="bounceIn"
              delay={200}
              duration={1100}
              source={require("../../assets/img/logo.png")}
              style={styles.logo}
            />
            <Animatable.Text
              style={styles.title}
              animation="fadeIn"
              delay={300}
              duration={1500}
            >
              MOVEET
            </Animatable.Text>
          </View>
          <Animatable.View animation="fadeInLeft" delay={300}>
            <TextInput
              autoCorrect={false}
              underlineColorAndroid={"transparent"}
              style={styles.input}
              placeholder="E-mail"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInRight" delay={300}>
            <TextInput
              autoCorrect={false}
              underlineColorAndroid={"transparent"}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" delay={300}>
            <TouchableOpacity
              onPress={this.onSubmitPress}
              style={styles.login_button}
            >
              <Text style={styles.login_text}>
                CONNEXION
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.signup({})}
              style={styles.login_button}
            >
              <Text style={styles.login_text}>
                CREER UN COMPTE
              </Text>
            </TouchableOpacity>

          </Animatable.View>
          {this.renderFacebookLogin()}
        </Image>
      </ScrollView>
    );
  }
}

const PADDING = 60;
const inputWidth = Dimensions.get("window").width - PADDING * 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "center",
    width: null,
    height: height + 50,
    resizeMode: "cover",
    padding: 20
  },
  logo_container: {
    alignItems: "center"
  },
  logo: {
    width: 180,
    height: 180
  },
  input: {
    height: 50,
    borderWidth: 1,
    backgroundColor: "white",
    color: Global.moveetColor,
    width: inputWidth,
    borderRadius: 25,
    borderColor: Global.moveetColor,
    borderWidth: 3,
    marginBottom: 10,
    fontFamily: Global.secondFont,
    fontSize: 16,
    padding: 16,
    textAlign: "center"
  },
  title: {
    fontFamily: Global.mainFont,
    fontSize: 50,
    color: Global.moveetColor,
    borderBottomColor: "#59BDB2",
    borderBottomWidth: 5,
    marginBottom: 10,
    backgroundColor: "transparent"
  },
  login_button: {
    backgroundColor: Global.moveetColor,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: inputWidth,
    marginBottom: 10
  },
  login_text: {
    color: "white",
    alignItems: "center",
    fontFamily: Global.mainFont,
    fontSize: 20
  }
});
