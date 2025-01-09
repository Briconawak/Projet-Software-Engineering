import { io } from "socket.io-client";

class Client {

    connect() {
        this.socket = io("http://localhost:8080", {
            transports: ['websocket']
        });
    
        this.socket.on("connect", () => {
            console.log(this.socket.id); // 'G5p5...'
        });
    
        this.socket.on("connect_error", (err) => {
            console.log(err); // true
        });
    }

    setUsername(username) {
        this.socket.emit("set-username", username);
    }
    
    sendMessage(channelPath, content) {
        this.socket.emit("message", {
            channel: channelPath,
            body: content
        });
    }

    onMessage(callback) {
        this.socket.on("message", callback);
    }

    joinChannel(channel) {
        this.socket.emit("join-channel", channel);
    }

    getMessages(channel, page = 0) {
        return new Promise((resolve, reject) => {
            this.socket.emit("get-messages", {
                channel: channel,
                page: page
            }, (messages) => {
                console.log("loaded from the server", messages);
                resolve(messages);
            });
        });
    }
}


export default Client;