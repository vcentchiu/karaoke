(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var users = {};
var socket;


$(function() {
	// socket = io();
	// window.socket = socket;

	// var Peer = require('simple-peer');
	
	// var p = new peer({
	// 	initiator: location.href === "/room",
	// 	trickle: false
	// })
	// p.on('signal', function(data) {
	// 	var roomId = JSON.stringify(data);
	// 	$("#room-id").html(roomId);
	// });		

	// p.on('error', function (err) { console.log('error', err) })


	$("#create-submit").click(function() {
		console.log("load room");
		$("#create-form").css("display", "none");
		$("#landing").css("display", "none");
		$("#room").css("display", "block");
		// socket.emit("user_login", $("#username").val());
	});


	// socket.on('user_join', function(user) {
	// 	console.log(user.name + " has joined");
	// 	addUser(user);
	// });

	// // user status lights

	// socket.on('user-status-on', function(user) {
	// 	statusOn(user.name);
	// });
	// socket.on('user-status-off', function(user) {
	// 	statusOff(user.name);
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
},{}]},{},[1]);
