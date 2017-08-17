var THUMBNAILSTYLE = "max-width: 50px; height: 50px; border-radius: 7%";

$(function() {
    var socket = window.socket;
    $("#search-form").submit(function( event ) {
        event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '/search/' + $("#query").val(),
            success: function(data) {
                $("#query").val("");
                var results = { results: data};
                console.log(data);
                var template = $("#search-template").html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, results);
                $("#search").html(rendered);
            }, 
            error: function(jqXHR, textStatus, err) {
                alert('text status '+ textStatus + ', err ' + err);
            }
        });
        // var params = {q: $("#query").val() };
        // console.log(params);
    });
});

function createResultDOM(id, title, thumbnail) {
    var resultRow = document.createElement("div");
    resultRow.setAttribute("id", id);
    resultRow.onclick = function() { songSelect(this.id); };
    resultRow.setAttribute("class", "result_row");
    var resultNail = document.createElement("div");
    resultNail.setAttribute("class", "result_nail");
    var nailImg = document.createElement("img");
    nailImg.setAttribute("src", thumbnail);
    nailImg.setAttribute("style", THUMBNAILSTYLE);
    var resultDetail = document.createElement("div");
    resultDetail.setAttribute("class", "result_details");
    var resultTitle = document.createElement("p");
    var text = document.createTextNode(title); 
    // append
    resultTitle.appendChild(text);
    resultDetail.appendChild(resultTitle);  
    resultNail.appendChild(nailImg);
    resultRow.appendChild(resultNail);
    resultRow.appendChild(resultDetail);
    return resultRow;
}

function loadResults(results) {
    var content = document.getElementById("content");
    // save results data
    // send list to database 
    while (content.hasChildNodes()) {
        content.removeChild(content.lastChild);
    }
    for (var i=0; i<5 || i<results.length; i++) {
        var song = results[i];
        var id = song.id;
        var title = song.title;
        var thumbnail = song.thumbnail;
        // create DOM elements
        var result = createResultDOM(id, title, thumbnail);
        content.appendChild(result);
    }
}