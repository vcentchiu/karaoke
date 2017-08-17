// Flask Variables
// currentList = playlist['current']; // list of song id -> details

// var playlist;
// function setPlaylist(name) {
// 	playlist = window.playlists["current"];
// }

// current
// setPlaylist("current");
// console.log("playlist " + playlist);

// loadResults();

// console.log(currentPlaylist.length);
// Play Control Variables
var playing = false;
var autoplay = 1;
var songSelected = false;
var playButtonSrc = "/static/images/play.png";
var pauseButtonSrc = "/static/images/pause.png";
var playButton = document.getElementById("play_button");
var player;
var playerReady = false;
var playlist;


// get Playlist data -> list of json object
// var resultsData = {{ results|tojson|safe }};
// var JSONObject = JSON.parse(resultsData);
// console.log(JSONObject);
// $(document).ready(function() {
// 	playlist = JSON.parse($("#center_navi #content").attr("data"));
// });


// playlist helper functions
function songAtIndex(n) {
	return playlist[n];
}

// $(function() {
// 	playlist = $("content").data("playlist");
// 	console.log
// 	$(".result_row").click(function(){
// 		var result = selection.id;
// 		console.log(result);
// 		songSelect(playlist[result]);
// 	});
// });

// Click Listeners


function createPlayer(id) {
	// create player object
	player = new YT.Player("player", {
        height: "0",
        width: '0',
        videoId: id,
        autoplay: autoplay,
        events: {
        	'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(e) {
	playerReady = true;
	playVideo();
}

function loadVideo(id) {
	console.log(playerReady);
	if (playerReady == false) {
		player.loadVideoById(id);
	}
	setTimeout(loadVideo(id), 50);
	return;
}

function songSelect(songID) {
	// var songID = resultNode.id;
	// console.log(resultNode);
	if (songSelected == true) {
		songSelected = true;
		player.loadVideoById(songID);
		playVideo();
	} else {
		songSelected = true;
		createPlayer(songID);
	}
}


function autoplayOn() {
	autoplay = 1;
	playing = true;
}
function autoplayOff() {
	autoplay = 0;
	playing = false;
}


function playVideo() {
	player.playVideo();
	playButton.setAttribute('src', pauseButtonSrc);
	playing = true;
}
function pauseVideo() {
	player.pauseVideo();
	playButton.setAttribute('src', playButtonSrc);
	playing = false;
}
function togglePlayer() {
	if (songSelected == false) {
		return;
	}
	if (playing == false) {
		playVideo();
	} else {
		pauseVideo();
	}
}

// function onPlayerStateChange(event) {
//     if (event.data == YT.PlayerState.PLAYING) {

//       $('#progressBar').show();
//       var playerTotalTime = player.getDuration();

//       mytimer = setInterval(function() {
//         var playerCurrentTime = player.getCurrentTime();

//         var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;


//         progress(playerTimeDifference, $('#progressBar'));
//       }, 1000);        
//     } else {
      
//       clearTimeout(mytimer);
//       $('#progressBar').hide();
//     }
// }

