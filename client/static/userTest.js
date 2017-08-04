

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

	socket.emit('mic');
	socket.on('mic_ready', function() {
		console.log("yay");
	});


	$("#join-submit").click(function() {
		console.log("joining room");
		$("#create-form").css("display", "none");
		$("#landing").css("display", "none");
		$("#user").css("display", "block");
		// roomId = $("#roomid").val(); 
		username = $("#username").val();

		socket.emit('user_login', username);
		startMic();

		// startConnection();
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
			data.name = username;
			socket.emit('new_mic', data);
			console.log(data.micId);
		})

		socket.on('verify_room', function(key) {
			if (key.mic === micId) {
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

	
	


	function errorHandle() {
		conn.on('error', function(err) {
			console.log(err);
		});
	}
	

	function dataWrap(id, data) {
		var info = {};
		info.id = id;
		info.data = data;
		return info;
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




