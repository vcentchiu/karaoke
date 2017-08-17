
$(function() {
	var socket = io();
	window.socket = socket;

	$(".btn-landing").click(function() {
		openModal(this.id);
	});

	$("#create-submit").click(function() {
		var roomname = $("#roomname").val();
		// socket.emit("create_room", roomname);
		$.ajax({
			url: "/create-room/" + socket.id + '-' + roomname,
			success: function(result) {
				console.log("success");
				window.location = "/room/" + result;
			}
		});

	});

	$("#join-submit").click(function() {
		console.log("joining room");
		window.location = "/" + $("#roomid").val();
	});

	socket.on('room_error', function() {
		// shake modal: error message 
	});

	// socket.on('room_approve', function(namespace) {
	// 	window.location = "/room/" + namespace;
	// 	return false;
	// });

});

function openModal(id) {
	var $modal = $("#" + id + "-form");
	$modal.css("display", "block");
	$modal.velocity(
		{ opacity: 1}, 
		{ duration: 500,
			easing: "easeInOut"
		}
	);
	$(".filter").click(function() {
		$modal.velocity(
			{ opacity: 0},
			{ 
				duration: 250,
				easing: "easeInOut",
				complete: function() {
					$modal.css("display", "none");	
				}
			}
		)
	});
}

function createRoom() {
	location.href = "/room";
}

function joinRoom() {
	location.href = "/room";
}