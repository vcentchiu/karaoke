var sound;
var socket;


$(function() {
	

	
	$("#join-submit").click(function() {
		console.log("joining room");
		$("#create-form").css("display", "none");
		$("#landing").css("display", "none");
		$("#user").css("display", "block");
		socket.emit("user_login", $("#username").val());   
	});
	navigator.mediaDevices.getUserMedia({audio: true, video: false})
		.then(function(mediaStream) {
			window.stream = mediaStream;
			var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
			sound = audioCtx.createMediaStreamSource(window.stream);



		})
		.catch(function(err) {
			console.log(err.name + ": " + err.message);
		}
	);
	// micToggle();
});


function micToggle() {
	var micOn = false;
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
				// startMic = setInterval(function() { 
				// 	console.log(sound);
				// 	socket.emit("streaming", sound);
				// }, 60);
			}
		}
	});
	function stopMic() {
		clearInterval(startMic);
	}
}


function getAudio() {
}

function micOffCSS() {
	$("#mic").css("box-shadow", "4px 4px 10px #000000");
	$("#mic").css("background", "black");
}
function micOnCSS() {
	$("#mic").css("background", "green");
	$("#mic").css("box-shadow", "0px 0px 0px");
}
