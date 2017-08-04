var users = {};
var socket;


$(function() {
	socket = io();
	window.socket = socket;
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	var peer = new SimplePeer({ 
		initiator: true,
		trickle: false,
		offerConstraints: { 
      		offerToReceiveAudio: true, 
      		offerToReceiveVideo: true
    	}
	})

	peer.on('signal', function(data) {
		$("#room-id").html(JSON.stringify(data));
		console.log(JSON.stringify(data));
	});

	peer.on('data', function(data) {
		console.log(data);

	});

	peer.on('stream', function(stream) {
		// // console.log(stream);
		// source = audioCtx.createMediaStreamSource(stream);
		// source.connect(analyser);
		// var printFrequency = setInterval(function() {
		// 	console.log(stream);
		// 	analyser.getByteFrequencyData(dataArray);
		// 	console.log(dataArray);
		// }, 500);
		// analyser.connect(audioCtx.destination);
		// // var source = audioCtx.createMediaStreamSource(stream);
		// // source.connect(audioCtx.destination);

		var video = document.createElement('video');
	    document.body.appendChild(video);

	    video.src = window.URL.createObjectURL(stream);
	    video.play()
	});

	socket.on('add_mic', function(micId) {
		var micKey = JSON.parse(micId);
		console.log(micKey);
		peer.signal(micId);
	});

	$("#create-submit").click(function() {
		console.log("load room");
		$("#create-form").css("display", "none");
		$("#landing").css("display", "none");
		$("#room").css("display", "block");
		// socket.emit("user_login", $("#username").val());
	});
	

	socket.on('user_join', function(user) {
		console.log(user.name + " has joined");
		addUser(user);
	});

	// // user status lights

	socket.on('user-status-on', function(user) {
		statusOn(user.name);
	});
	socket.on('user-status-off', function(user) {
		statusOff(user.name);
	});

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