process.env.TZ = 'UTC';

const { 
    initDB,
    getChannelMessages,
    insertChannelMessage,
    resetDB,
} = require('./db/req.js');

const http = require('http');
const socketio = require('socket.io');

async function run() {
    console.log("Running server", new Date());

    await initDB();

    runServer();
}

function runServer() {
    const server = http.createServer();
    const io = socketio(server);

    io.on('connection', client => {
        client.username = null;
    
        console.log('connection');
    
        client.on('event', data => {
            console.log(data);
        });
    
        client.on('disconnect', () => { 
            console.log('disconnect');
        });
    
        client.on('message', ({ channel, body }) => {
            if(client.username == null) return;
    
            console.log("message", { channel, body });
            if(client.rooms.has(channel)) {
                console.log("forwarding message to channel", channel);

                const now = new Date();

                // broadcast to all clients
                client.broadcast.to(channel).emit('message', {
                    channel,
                    username: client.username,
                    body,
                    createdAt: now,
                });

                // insert into database
                insertChannelMessage(channel, { 
                    username: client.username, 
                    body,
                    createdAt: now,
                });
            }
            
        });
    
        client.on('join-channel', (data) => {
            client.join(data);    
        });

        client.on('set-username', (data) => {
            if(typeof data !== 'string' || (data.length < 1 || data.length > 36)) return;
            client.username = data;
        });

        client.on('get-messages', async ({ channel, page }, callbackFn) => {
            const messages = await getChannelMessages(channel, page);
            // reply to client
            callbackFn(messages);
        });

    });
    
    io.on('error', (err) => {
        console.log(err);
    });
    
    server.listen(8080);
}



run();

/* 
Propreties MESSAGES : 
- channel : string
- body: message content
*/




/**
 * INSERT chat (channelPath, username, body) VALUES ('channel1', 'user1', 'hello world');
 * SELECT * FROM chat WHERE channelPath = 'channel1';
 */