import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
  Dimensions
} from "react-native";
import Api from "../Api";

import ImagePicker from "react-native-image-crop-picker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "blue",
    marginBottom: 10
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  }
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null
    };
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true
    })
      .then(image => {
        console.log("received base64 image");
        console.log("received base64 image", image.data);

        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height
          },
          images: null
        });
        console.log("image.uri....", image.uri);
      })
      .catch(e => alert(e));
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

  renderImage(image) {
    return (
      <Image
        style={{ width: 200, height: 200, resizeMode: "contain" }}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf("video/") !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.image ? this.renderAsset(this.state.image) : null}
          {this.state.images
            ? this.state.images.map(i => (
                <View key={i.uri}>{this.renderAsset(i)}</View>
              ))
            : null}
        </ScrollView>
        <ScrollView>
          <TouchableOpacity
            onPress={() => this.pickSingleBase64(false)}
            style={styles.button}
          >
            <Text style={styles.text}>Select Single Returning Base64</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.pickSingle(true)}
            style={styles.button}
          >
            <Text style={styles.text}>Select Single With Cropping</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
