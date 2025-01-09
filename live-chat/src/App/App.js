import React, { useState } from 'react';

import SidePanel from './SidePanel/SidePanel';
import ChatContent from './ChatContent/ChatContent';

import './App.css';
import './Fonts.css';


import Client from '../api/connection';
import Overlay from './Overlay/Overlay';
import Prompt from './Prompt/Prompt';

const client = new Client();

class MessageItem {
  constructor({ username, body, date = new Date() }) {
    this.username = username;
    this.body = body;
    this.date = date;
  }
}

class Channel {
  constructor(path) {
    this.path = path;
    this.messages = [];
  }

  addMessage(message) {
    this.messages.push(message);
  }

  addMessageRange(messages) {
    this.messages.push(...messages);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: {},
      currentPath: null,
      username: null,

      promptModal: [],
    }

    client.connect();
    client.onMessage((details) => {
      this.addMessage(details.channel, new MessageItem({
        username: details.username,
        body: details.body,
        date: new Date(details.createdAt),
      }));
    });
  }

  setUsername(username) {
    this.setState({
      username: username
    });

    client.setUsername(username);
  }

  addMessage(channelPath, message) {
    this.addMessageRange(channelPath, [message]);
  }

  addMessageRange(channelPath, message) {
    const nextChannel = {};

    for (const key in this.state.channels) {
      const channel = this.state.channels[key];

      if (channel.path === channelPath) {
        channel.addMessageRange(message);
      }

      nextChannel[key] = channel;
    }

    this.setState({
      channels: nextChannel
    });
  }

  sendMessage(message) {
    const channelPath = this.state.currentPath;

    const ms = new MessageItem({
      username: this.state.username,
      body: message,
      date: new Date(),
    });

    this.addMessage(channelPath, ms);
    client.sendMessage(channelPath, message);
  }

  async addChannel() {
    try {
      const channelPath = await this.pushPromptModal({
        title: 'New Channel',
        content: 'Type the name of the channel',
      });
      if (!channelPath) return;

      if (this.state.channels[channelPath] != undefined) {
        return;
      }

      client.joinChannel(channelPath);

      client.getMessages(channelPath).then((messages) => {
        this.addMessageRange(channelPath, messages.map((msg) => new MessageItem({
          username: msg.username,
          body: msg.body,
          date: new Date(msg.created_at),
        })));
      });

      this.setState({
        channels: {
          ...this.state.channels,
          [channelPath]: new Channel(channelPath)
        }
      });

      this.changeChannel(channelPath);
    } catch (e) { }
  }

  changeChannel(channelPath) {
    this.setState({
      currentPath: channelPath
    });
  }

  closePromptModal(promptItem) {
    this.setState({
      promptModal: this.state.promptModal.filter((item) => item !== promptItem)
    });
  }

  pushPromptModal({ title, content }) {
    return new Promise((resolve, reject) => {
      const promptItem = {
        title: title,
        content: content,
      };

      promptItem.onCancel = () => {
        this.closePromptModal(promptItem);

        reject();
      }

      promptItem.onSubmit = (value) => {
        this.closePromptModal(promptItem);

        resolve(value);
      }

      this.setState({
        promptModal: [...this.state.promptModal, promptItem]
      });
    });
  }

  render() {

    if (this.state.username == null) {
      return <Overlay onSubmit={this.setUsername.bind(this)} />;
    }

    return (
      <div className="app-container">
        <div className="app-content">
          <SidePanel list={this.state.channels} onNewChannel={this.addChannel.bind(this)} onChangeChannel={this.changeChannel.bind(this)} />

          <ChatContent channel={this.state.channels[this.state.currentPath] ?? null} onSubmit={this.sendMessage.bind(this)} />
        </div>

        {this.state.promptModal.map((modal, index) => {
          return <Prompt key={index} title={modal.title} content={modal.content} onSubmit={modal.onSubmit} onCancel={modal.onCancel} />
        })}
      </div>
    );
  }


}

export default App;
