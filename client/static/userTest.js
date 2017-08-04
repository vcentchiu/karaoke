

// get user list from server
	// socket.on('request_access')
// check if username is valid
// connect 
	// socket.emi('add_user')
		//io.emit('add_user') -> main channel updates list

// 


$(function() {
	var roomId;
	var username;
	var micId;
	var socket;


	var sound;
	var micOn = false;
	var peer;
	var parser = document.createElement('a');
	parser.href = window.location.href;
	console.log(parser.pathname);
	socket = io(parser.pathname);
	window.socket = socket;

	// startMic();

	$("#join-submit").click(function() {
		// roomId = $("#roomid").val();
		username = $("#username").val();
		$("#user-info").css("display", "none");
		// socket.emit('user_login', username);
		// startMic();

		socket.emit('mic', username);

		// startConnection();
	});

	socket.on('mic_ready', function(user) {
		if (user.id === socket.id) {
			console.log("mic entered");
			startMic();
		}
	});
	

	function startMic() {
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
			.then(function(mediaStream) {
				// window.stream = mediaStream;
				// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
				// sound = audioCtx.createMediaStreamSource(window.stream);

				peer = new SimplePeer({ 
					initiator: true,
					trickle: false,
					offerConstraints: { 
						offerToReceiveAudio: false, 
			     		offerToReceiveVideo: false
					},
					stream: mediaStream
				})
				

				
				_startConnection();
			})
			.catch(function(err) {
				console.log(err);
			}
		);
	}

	function _startConnection() {
		console.log("please wait. connecting mic...");

		peer.on('signal', function(micId) {
			// $("#room-id").html(JSON.stringify(data));
			// micId = micId;
			var data = {};
			data.micId = JSON.stringify(micId);
			data.micName = username;
			// data.socketId = window.socket.id;
			socket.emit('new_mic', data); // send mic id over 
			// sendData('new_mic', data);
			console.log(data.micName);
			console.log(data.micId);
		})

		socket.on('verify_room', function(key) {
			console.log("mic name" + key.micName);
			console.log("username: " + username);
			if (key.micName === username) {
				console.log("connected mic!");
				var roomKey = JSON.parse(key.room);
				peer.signal(roomKey);
			}
		})

		peer.on('connect', function() {
			// connection ready
			console.log('ready');

			// allow MIC Controls
			// micToggle();
		})
	}


	function micToggle() {
		var startMic;
		$("#mic").bind({
			click: function() {
				console.log(micOn);
				if (micOn) {
					socket.emit('mic-off');
					micOn = false;
					console.log("mic off");
					micOffCSS();
					stopMic();
				} else {
					socket.emit('mic-on');
					micOn = true;
					console.log("mic on");
					micOnCSS();
					// peer.stream = window.stream;
					console.log(peer.stream);

					startMic = setInterval(function() { 
						console.log(sound);
						console.log(window.stream);
					}, 60);
				}
			}
		});
		function stopMic() {
			// clearInterval(startMic);
			peer.stream = false;
		}
	}

	function sendData(msg, data) {
		var info = {};
		info.data = data;
		info.id = socket.id;
		socket.emit(msg, info);
	}
	
	


	function errorHandle() {
		conn.on('error', function(err) {
			console.log(err);
		});
	}
});



function micOffCSS() {
	$("#mic").css("box-shadow", "4px 4px 10px #000000");
	$("#mic").css("background", "black");
}
function micOnCSS() {
	$("#mic").css("background", "green");
	$("#mic").css("box-shadow", "0px 0px 0px");
}




