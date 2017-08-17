// var YouTube = require('youtube-node');
// var youTube = new YouTube();
// youTube.setKey('AIzaSyCTEZJqKL0JcDcn1jDhTYvxQhQGDdxvrII');

// function Youtube() {}

// Youtube.prototype.search = function(query) {
// 	var results = null;
// 	results = youTube.search(query, 2, function(error, result) {
// 		if (error) {
// 		    console.log(error);
// 		}
// 		else {
// 		    // console.log(JSON.stringify(result, null, 2));
// 		    // console.log(result);
// 		 	// return result;
// 		 	// return result;
// 		 	// callback(result);
// 		 	var list = [];
// 			var items = result.items;
// 			for (var i = 0; i < items.length; i++) { 
// 				var item = items[i];
// 				result = {};
// 				var snippet = item.snippet;
// 				result.id = item.id.videoId;
// 				result.title = snippet.title;
// 				result.img = snippet.thumbnails.default.url;
// 				list.push(result);
// 			}
// 			return list;
// 		}
// 	});
// 	function wait() {
// 		if (results === null) {
// 			setTimeout(wait, 1000);
// 		} else {
// 			return results;
// 		}
// 	}
// 	return wait();
// }




module.exports = new Youtube;
	