import React from "react";
import { AsyncStorage } from "react-native";
import SocketIOClient from "socket.io-client";
import {
  GiftedChat,
  Bubble,
  MessageText,
  Time,
  Send
} from "react-native-gifted-chat";
import Api from "../Api";
import Global from "../Global";
import Config from "../Config";

const USER_ID = Api.getUser()._id;
console.log("USERID ", USER_ID);

export default class TchatScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      talk_id: null
    };

    this.getMessages = this.getMessages.bind(this);
    this.loadMessages = this.loadMessages.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
    //this.client = SocketIOClient('http://192.168.1.10:3000/',{jsonp: false});
    // this.client = SocketIOClient("http://localhost:3000", {
    //   jsonp: false
    // });
    this.client = SocketIOClient(`${Config.hostChat}`, {
      jsonp: false
    });
    this._isMounted = false;
    this.client.on("serverSendsMessage", this.onMessageReceived);
    this.client.on("serverloadsMessages", this.loadMessages);

    this.USER_ID = Api.getUser()._id;
    this.USER_STATUS = "sender";
  }

  componentDidMount() {
    // récupère les messages de l'utilisateur
    this.getMessages();
    // enregistre l'id de l'utilisateur connecté
    this.setState({
      userId: Api.getUser()._id
    });
    this._isMounted = true;
  } // componentDidMount

  componentWillUnmount() {
    this._isMounted = false;
  }

  getMessages() {
    console.log("getMessages USER_ID ", this.USER_ID);
    //console.log("getMessages USER_STATUS ", this.USER_STATUS);
    this.client.emit("clientGetMessages", {
      userId: this.USER_ID,
      //userStatus: this.USER_STATUS,
      speakerId: this.props.userDataChat._id
    });
  } // getMessages

  loadMessages(talk) {
    console.log("client loads messages");
    console.log("loadMessages talk ", talk);
    if (this._isMounted) {
      if (talk) {
        this.setState({
          messages: talk.messages ? talk.messages.reverse() : [],
          talk_id: talk._id
        });
      }
    }
  } // loadMessages

  onMessageReceived(messages) {
    console.log("client receives message");
    messages.reverse();
    if (this._isMounted) {
      this.setState({
        messages
      });
    }
  } // onMessageReceived

  onSendMessage(message) {
    console.log("client sends message");
    var messageData = {
      text: message[0].text,
      user: {
        _id: Api.getUser()._id,
        name: Api.getUser().account.username
        //avatar: Api.getUser().photo
      },
      createdAt: new Date(message[0].createdAt)
    };
    console.log("TchatScene#onSend talk_id ", this.state.talk_id);
    this.client.emit("clientSendsMessage", {
      message: messageData,
      talk_id: this.state.talk_id
    });
  } // onSendMessage

  renderSend(props) {
    return (
      <Send
        {...props}
        textStyle={{
          color: `${Global.globalColors.colors.primary}`
        }}
      />
    );
  }

  renderTime(props) {
    return (
      <Time
        {...props}
        textStyle={{
          left: {
            color: `${Global.globalColors.colors.tchatColor}`
          },
          right: {
            color: `${Global.globalColors.colors.tchatColor}`
          }
        }}
      />
    );
  }

  renderMessageText(props) {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: {
            color: `${Global.globalColors.colors.tchatColor}`
          },
          right: {
            color: `${Global.globalColors.colors.tchatColor}`
          }
        }}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: `${Global.globalColors.colors.secondary}`
          },
          right: {
            backgroundColor: `${Global.globalColors.colors.primary}`
          }
        }}
      />
    );
  }

  render() {
    var user = {
      _id: this.state.userId || -1
    };
    //    console.log("this.state.userId", this.state.userId);
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSendMessage}
        user={user}
        renderBubble={this.renderBubble}
        renderMessageText={this.renderMessageText}
        renderTime={this.renderTime}
        renderSend={this.renderSend}
      />
    );
  }
}
