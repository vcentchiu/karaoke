var express = require('express');
var path = require('path');
var fs = require('fs');
var https = require('https');
var app = express();
var sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
var m = require('mustache');

var YouTube = require('youtube-node');
var youtube = new YouTube();
youtube.setKey('AIzaSyCTEZJqKL0JcDcn1jDhTYvxQhQGDdxvrII');
// var youtube = require('./api/youtube');

// var mongo = require('mongodb').MongoClient;
// var assert = require('assert');
// var url = 'mongodb://vincechiu:vchiu1013@ds013232.mlab.com:13232/karaoke';
// var db;
// var server = https.Server(sslOptions, app).listen(8080);

//  for heroku 
var port = process.env.PORT || 8080;

// const server = app.listen(8080, () => {
// 	const host = server.address().address;
// 	const port = server.address().port;
// 	// console.log('app listening at http://' + ${host} + ':' + ${port});
// });

const server = app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

const io = require('socket.io')(server);

// var io = require('socket.io')(server);
// mongo.connect(url, function(err, database) {
// 	assert.equal(null, err);
// 	db = database;
// 	server.listen(8080);
// });

app.use(express.static(__dirname + '/client'));

app.use('/simple-peer', express.static(__dirname + '/node_modules/simple-peer/'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/client/static/templates/index.html'));
});

app.get('/room/:id', function(req, res) {
	// if room number is valid // room already open
	// mongo.createCollection(req.params.id);
	res.sendFile(path.join(__dirname, '/client/static/templates/room.html'));
});

app.get('/:id', function(req, res) {
	// check if id in rooms list
	// console.log("joining room: " + req.params.id);
	res.sendFile(path.join(__dirname, '/client/static/templates/mic.html'));
});


var rooms = {};

app.get('/create-room/:id-:name', function(req, res) {
	var roomId = req.params.id;
	var roomName = req.params.name;
	// console.log(id);
	
	// var rooms = db.collection('rooms');
	// var Room = {
	// 	name: roomName,
	// 	queue: null,
	// 	mics: null, 
	// }
	// db.rooms.insertOne(Room, function(err, result) {
	// 	assert.equal(null, err);
	// 	console.log("room created");
	// 	res.send("room-created");
	// });
	// res.sendFile(path.join(__dirname, '/client/static/templates/room.html'));
	var newRoom = new Room();
	newRoom.init(roomName);
	res.redirect('/room/' + roomName);
});


app.get('/search/:query', function(req, res) {
	// console.log("here");
	// console.log(req.query.q);
	// res.send(req.query);
	var query = req.params.query;
	console.log(query);
	// res.send(query);
	var results;
	youtube.search(query, 2, function(error, result) {
		if (error) {
		    console.log(error);
		}
		else {
			// console.log(result.items);
			results = result.items;
			res.json(JSON.stringify(results));
			// res.data = result;
		 	// send(result);
		}
	});
	// function waitForResults() {
	// 	if (results) {
	// 		res.setHeader('Content-Type', 'application/json');
 //    		// res.send(JSON.stringify({ a: 1 }));
 //    		console.log(results);
	// 		res.send(JSON.stringify(results));
	// 	} else {
	// 		setTimeout(waitForResults, 1000);
	// 	}
	// }
	// waitForResults();
	// // res.send('test');
});

var sockets = {};
var users = [];


var rooms = [];


// io.on('connection', function(socket) { 
// 	// io send roomname list
// 	// console.log("new user");
// 	var user;

// 	io.emit('rooms_list', rooms);
// 	socket.on('create_room', function(roomname) {
// 		// if (roomname in rooms) {
// 		// 	socket.broadcast.to(socket.id).emit('room_error');
// 		// } else {
// 			var newRoom = new Room();
// 			newRoom.init(roomname);
// 			// socket.broadcast.to(socket.id).emit('room_approve');
// 			io.emit('room_approve', roomname);
// 		// }
// 	});
// });


// function Room() {}
// Room.prototype.init = function(roomname, password) {
// 	this.name = roomname;
// 	this.password = password;
// }


function Room() {}
Room.prototype.init = function(roomname) {
	var sockets = {};
	this.roomname = roomname;
	console.log("attr roomname: " +  this.roomname);
	console.log("roomname: " + roomname);
	var roomio = io.of('/' + this.roomname);

	roomio.on('connection', function(socket) {
		console.log("connection to room: " + roomname);

		socket.on('room', function() {
			roomio.emit('room_ready');

		});

		socket.on('mic', function(username) {
			var user = createUser(username, socket.id);
			sockets[socket.id] = socket;
			roomio.emit('mic_ready', user);
		});

		// socket.on('user_login', function(name) {
		// 	console.log("player join");
		// 	user = createUser(name, socket.id);
		// 	sockets[socket.id] = user;
		// 	io.emit('user_join', user);
		// });

		socket.on('new_mic', function(micId) {
			roomio.emit('add_mic', micId);
		});

		socket.on('send_roomId', function(data) {
			// send to specific mic
			roomio.emit('verify_room', data);
		})

		// socket.on('streaming', function(stream) {
		// 	console.log("inc voice: " + stream);
		// 	io.emit('sound', stream);
		// });

		// socket.on('mic-on', function() {
		// 	io.emit('user-status-on', user);
		// });
		// socket.on('mic-off', function() {
		// 	io.emit('user-status-off', user);
		// });

		// socket.on('disconnect', function() {
		// 	console.log("player disconnect");
		// 	io.emit('user_leave', user);
		// 	delete sockets[socket.id];
			
		// });
	});
}




function createUser(name, socketId) {
	var user = {};
	user.name = name;
	user.id = socketId;

	return user;
}

