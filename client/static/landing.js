
$(function() {
	var socket = io();
	window.socket = socket;

	$(".btn-landing").click(function() {
		openModal(this.id);
	});

	$("#create-submit").click(function() {
		var roomname = $("#roomname").val();
		console.log("load room: " + roomname);
		socket.emit("create_room", roomname);
	});

	socket.on('room_error', function() {
		// shake modal: error message 
	});

	socket.on('room_approve', function(namespace) {
		// $("#create-form").css("display", "none");
		// $("#landing").css("display", "none");
		// $("#room").css("display", "block");
		console.log(namespace);
		window.location = "/room/" + namespace;
		return false;
	});

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