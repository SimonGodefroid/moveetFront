// import library
import React from 'react';
import {
  View,
  ListView,
  StatusBar,
} from 'react-native';
import Api from '../core/Api';

// import component
import Conversation from '../commons/Conversation';
//import Card from '../commons/Card';
//import OfferCard from '../commons/OfferCard';
import Global from '../core/Global';
//import Config from '../core/Config';

//const RECRUITERS = 'user/recruiters?lng=user.loc[0]&lat=user.loc[1]';
//const CANDIDATES = `user/candidates?lng=${this.state.user.loc[0]}&lat=${this.state.user.loc[1]}`;

// create component & render
export default class TchatListScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    };
    //this.renderCard = this.renderCard.bind(this);
  }

  componentDidMount() {
    Api.getNearestUsersByLocation()
      .then((users) => {
        console.log('#HomeScene | @Api.getNearestUsersByLocation() =>', users);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(users),
        });
      });
  }


  // renderCard(rowData) {
  //   const user = Api.getUser();
  //   if (user.status === 'candidate') {
  //     console.log('user is a candidate');
  //     return (<OfferCard {...rowData} />);
  //   }
  //   console.log('user is a recruiter');
  //   return (<Card {...rowData} />);
  // }

  render() {
    return (
      <View style={[Global.container, { paddingTop: 62, paddingBottom: 50 }]} >
        <StatusBar
          //backgroundColor="blue"
          barStyle="light-content"
        />
        <ListView
          style={{ marginHorizontal: 8 }}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Conversation {...rowData} />}
        />
      </View>
    );
  }
}
