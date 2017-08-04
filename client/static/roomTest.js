var users = {};
var socket;

var mics = {};

$(function() {
	var parser = document.createElement('a');
	parser.href = window.location.href;
	// console.log(parser.pathname);

	var url = window.location.pathname;
	var urlsplit = url.split("/").slice(-1)[0];

	socket = io("/" + urlsplit);
	window.socket = socket;

	console.log(socket);
	
	socket.emit('room');
	socket.on('room_ready', function() {
		console.log('yaya');
	})

	// socket.on('joined_room', function() {
	// 	socket.on('userser_join', function(user) {
	// 		console.log(user.name + " has joined");
	// 		addUser(user);
	// 	});

	// 	socket.on('add_mic', function(data) {
	// 		console.log('received mic id');
	// 		var mic = new MicConnection();
	// 		mic.init(data.micId);
	// 		mics[data.name] = mic;
	// 	});

	// 	// // user status lights

	// 	socket.on('user-status-on', function(user) {
	// 		statusOn(user.name);
	// 	});
	// 	socket.on('user-status-off', function(user) {
	// 		statusOff(user.name);
	// 	});
	// });

	


	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);



	// peer.on('stream', function(stream) {
	// 	// // console.log(stream);
	// 	// source = audioCtx.createMediaStreamSource(stream);
	// 	// source.connect(analyser);
	// 	// var printFrequency = setInterval(function() {
	// 	// 	console.log(stream);
	// 	// 	analyser.getByteFrequencyData(dataArray);
	// 	// 	console.log(dataArray);
	// 	// }, 500);
	// 	// analyser.connect(audioCtx.destination);
	// 	// // var source = audioCtx.createMediaStreamSource(stream);
	// 	// // source.connect(audioCtx.destination);

	// 	var video = document.createElement('video');
	//     document.body.appendChild(video);

	//     video.src = window.URL.createObjectURL(stream);
	//     video.play()
	// });

	// socket.on('add_mic', function(micId) {
	// 	var micKey = JSON.parse(micId);
	// 	console.log(micKey);
	// 	peer.signal(micId);
	// });


	


	// // get sound
	// socket.on('sound', function(stream) {
	// 	console.log(stream);

	// });


	// socket.on('user_leave', function(user) {
	// 	console.log(user.name + " has left");
	// 	delete users[user.id];
	// });


});

// function addUser(userName) {
// 	// users[user.id] = user;
// 	var $userCont = $("<div>", {"class": "user-container", "id": userName});
// 	var $userStatus = $("<div>", {"class": "user-status"});
// 	var $userName = $("<div>", {"class": "user-name"});
// 	$userName.html(userName);
// 	$userCont.append($userName)
// 		.append($userStatus);
// 	$("#users-container").append($userCont);
// }

// socket stuff

// function enterRoom() {
// 	$("#form").css("display", "none");
// 	$("#room").css("display", "block");
// 	getAudio();
// 	micToggle();
// }

function MicConnection() {}


MicConnection.prototype.init = function(micId) {
	this.micId = micId;
	this.portId;
	this.audio;
	this.peer = new SimplePeer({ 
		initiator: false,
		trickle: false,
		offerConstraints: { 
      		offerToReceiveAudio: true, 
      		offerToReceiveVideo: true
    	}
	})

	this.peer.signal(micId);

	this.peer.on('signal', function(data) {
		var key = {};
		this.portId = JSON.stringify(data);
		key.room = this.portId;
		key.mic = this.micName;
		socket.emit('send_roomId', key);
	});

	this.peer.on('stream', function(stream) {
		console.log("streaming");
		var audio = document.createElement('audio');
		this.audio = audio;
		document.body.appendChild(audio);
	    audio.src = window.URL.createObjectURL(stream);

	    // attach reduction node 
	    audio.play();
	})
}

MicConnection.prototype.pause = function() {

}



function statusOn(userName) {
	console.log("receiving signal from: " + userName);
	var $status = $($("#" + userName).find("div.user-status")[0]);
	console.log($status);
	$status.css("background", "orange");	
}
function statusOff(userName) {
	console.log("receiving signal from: " + userName);
	var $status = $($("#" + userName).find("div.user-status")[0]);
	console.log($status);
	$status.css("background", "transparent");	
}


function addUser(user) {
	users[user.id] = user;
	var $userCont = $("<div>", {"class": "user-container", "id": user.name});
	var $userStatus = $("<div>", {"class": "user-status"});
	var $userName = $("<div>", {"class": "user-name"});
	$userName.html(user.name);
	$userCont.append($userName)
		.append($userStatus);
	$("#users-container").append($userCont);
}