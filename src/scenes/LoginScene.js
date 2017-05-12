import React from "react";
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

  render() {
    return (
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
        <Animatable.View animation="fadeInLeft" delay={400}>
          <TextInput
            autoCorrect={false}
            underlineColorAndroid={"transparent"}
            style={styles.input}
            placeholder="E-mail"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </Animatable.View>
        <Animatable.View animation="fadeInRight" delay={450}>
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
        <Animatable.View animation="fadeInUp" delay={500}>
          <TouchableOpacity
            onPress={this.onSubmitPress}
            style={styles.login_button}
          >
            <Text style={styles.login_text}>
              CONNEXION
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </Image>
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
    fontSize: 20,
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
