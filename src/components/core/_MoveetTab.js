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
  Modal
} from "react-native";
import Global from "../../Global";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import Menu from "./Menu";
import Filter from "./Filter";
import * as Animatable from "react-native-animatable";

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
    height: 80,
    paddingBottom: 10
  },
  itemHolder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  albertHolder: {
    justifyContent: "center",
    alignItems: "center"
  },
  bottomColor: {
    position: "absolute",
    backgroundColor: Global.mainColor,
    height: 60,
    left: 0,
    width: "100%"
  },
  albert: {
    width: 70,
    height: 70
  }
});

export default class AlbertTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      filterVisible: false
    };
    this.goToSearch = this.goToSearch.bind(this);
    this.setMenuVisible = this.setMenuVisible.bind(this);
    this.onCloseMenuFn = this.onCloseMenuFn.bind(this);
    this.onCloseFilterFn = this.onCloseFilterFn.bind(this);
    this.setFilterVisible = this.setFilterVisible.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.onValidateFilterFn = this.onValidateFilterFn.bind(this);
  }
  /* Gestion de la modal Menu */
  setMenuVisible(visible) {
    this.setState({ menuVisible: visible });
  }
  onCloseMenuFn(close) {
    this.setState({
      menuVisible: false
    });
  }

  /* Gestion du bouton Albert-search*/
  goToSearch() {
    Actions.search({});
  }

  /* Gestion de la modal Filter */
  setFilterVisible(visible) {
    this.setState({ filterVisible: visible });
  }
  onCloseFilterFn() {
    this.setState({
      filterVisible: false
    });
  }
  onValidateFilterFn(isPaidEvents, isCurrent, isToday, isFuture) {
    this.setState({
      filterVisible: false
    });
    this.props.onChangeFilterFn(isPaidEvents, isCurrent, isToday, isFuture);
  }

  renderFilter() {
    if (this.props.filter === true) {
      return (
        <View style={styles.itemHolder}>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.filterVisible}
            onRequestClose={() => {}}
          >
            <Filter
              onCloseFilterFn={this.onCloseFilterFn}
              onValidateFilterFn={this.onValidateFilterFn}
              isPaidEvents={this.props.isPaidEvents}
              isCurrent={this.props.isCurrent}
              isToday={this.props.isToday}
              isFuture={this.props.isFuture}
            />
          </Modal>
          <TouchableOpacity
            onPress={() => {
              this.setFilterVisible(true);
            }}
          >
            <Icon
              name={"ios-options-outline"}
              size={40}
              color={Global.secondColor}
            />
          </TouchableOpacity>
        </View>
      );
    } else if (this.props.filter === false) {
      return (
        <View style={styles.itemHolder}>
          <Icon name={"ios-options-outline"} size={40} color={"#8a9190"} />
        </View>
      );
    } else if (this.props.back === true) {
      return (
        <View style={styles.itemHolder}>
          <Icon name={"ios-arrow-back"} size={40} color={Global.secondColor} />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.tabContainer}>
        <View style={styles.bottomColor} />
        <View style={styles.itemHolder}>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.menuVisible}
            onRequestClose={() => {}}
          >
            <Menu onCloseFn={this.onCloseMenuFn} />
          </Modal>
          <TouchableOpacity
            onPress={() => {
              this.setMenuVisible(true);
            }}
          >
            <Icon name={"ios-menu"} size={40} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <View style={styles.itemHolder}>
          <TouchableOpacity onPress={this.goToSearch}>
            <Animatable.Image
              animation="bounceIn"
              delay={220}
              source={require("../../../assets/img/albert-tab.png")}
              style={styles.albert}
            />
          </TouchableOpacity>
        </View>
        {this.renderFilter()}
      </View>
    );
  }
}
