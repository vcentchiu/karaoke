$(function() {
	var roomId;
	var username;
	var micId;
	var socket = io();
	window.socket = socket;
	var sound;
	var micOn = false;
	var peer;



	$("#join-submit").click(function() {
		console.log("joining room");
		$("#create-form").css("display", "none");
		$("#landing").css("display", "none");
		$("#user").css("display", "block");
		roomId = $("#roomid").val(); 
		username = $("#username").val();

		socket.emit('user_login', username);
		startMic();

		// startConnection();
	});

	

	function startMic() {
		navigator.mediaDevices.getUserMedia({audio: true, video: true})
			.then(function(mediaStream) {
				// window.stream = mediaStream;
				// var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
				// sound = audioCtx.createMediaStreamSource(window.stream);

				peer = new SimplePeer({ 
					initiator: false,
					trickle: false,
					stream: mediaStream,
					offerConstraints: { 
			      		offerToReceiveAudio: false, 
			      		offerToReceiveVideo: false
			    	}
				})
				_startConnection();
			})
			.catch(function(err) {
				console.log(err);
			}
		);
	}

	function _startConnection() {
		var roomKey = JSON.parse(roomId);
		peer.signal(roomId);
		peer.on('signal', function(data) {
			console.log(data);
			micId = JSON.stringify(data);
			socket.emit('mic_join', micId);
		});

		peer.on('connect', function() {
			// connection ready
			console.log('ready');

			// allow MIC Controls
			micToggle();

		});
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




