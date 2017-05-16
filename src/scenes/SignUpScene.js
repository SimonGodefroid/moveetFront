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
export default class SignUpScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmitPress = this.onSubmitPress.bind(this);
  }

  onSubmitPress() {
    let user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    Api.signUp(user, () =>
      Actions.search({
        type: "replace"
      }));
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
            <Image
              source={require("../../assets/img/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>
              MOVEET
            </Text>
          </View>
          <View>
            <TextInput
              autoCorrect={false}
              underlineColorAndroid={"transparent"}
              style={styles.input}
              placeholder="Username"
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
            />
          </View>
          <View>
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
          </View>
          <View>
            <TextInput
              autoCorrect={false}
              underlineColorAndroid={"transparent"}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={this.onSubmitPress}
              style={styles.login_button}
            >
              <Text style={styles.login_text}>
                CREER MON COMPTE !
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 70,
    alignItems: "center",
    width: null,
    height: height + 100,
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
    marginBottom: 20,
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
    marginBottom: 30,
    backgroundColor: "transparent"
  },
  login_button: {
    backgroundColor: Global.moveetColor,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    width: inputWidth
  },
  login_text: {
    color: "white",
    alignItems: "center",
    fontFamily: Global.mainFont,
    fontSize: 20
  }
});
