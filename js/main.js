var index = 3;
var gameKeys = [];

$("#infoBtn").click(function(){
	$("#overlayContainer").toggleClass("overlayVisible");
});

$("#closeOverlayBtn").click(function(){
	$("#overlayContainer").toggleClass("overlayVisible");
});

$("#rightNav").click(function(){
	index = (index + 1) % gameKeys.length;
	fetchNextGame(gameKeys[index]);
});

$("#leftNav").click(function(){
	index = (index - 1);
	if (index < 0){
		index = gameKeys.length - 1;
	}
	fetchNextGame(gameKeys[Math.abs(index)]);
});

$(document).ready(function(){
	var param = {galaga: [0]};
	$.ajax({
		url: "https://arcade-cabinet-d6b6b.firebaseio.com/games/.json",
		type: "GET",
		data: JSON.stringify(param),
		success: function(data){
			for (var game in data){
				gameKeys.push(game);
			}
			console.log("success: GET init games");
		},
		error: function(error){
			console.log("error: " +error);
		}
	});
});

function fetchNextGame(gameName){
	$.ajax({
		url: "https://arcade-cabinet-d6b6b.firebaseio.com/games/" + gameName + "/.json",
		type: "GET",
		data: JSON.stringify(gameName),
		success: function(data){
			$(".devInfo").each(function(){
				$(this).html("<div class=\"animated fadeInUp\">" + data.developer + "</div>");
			});

			$(".yearInfo").each(function(){
				$(this).html("<div class=\"animated fadeInUp\">" + data.release_date + "</div>");
			});

			$(".copiesInfo").each(function(){
				$(this).html("<div class=\"animated fadeInUp\">" + data.copies_sold + "</div>");
			});

			$(".publisherInfo").each(function(){
				$(this).html("<div class=\"animated fadeInUp\">" + data.developer + "</div>");
			});

			$(".descripInfo").each(function(){
				$(this).html("<div class=\"animated fadeInUp\">" + data.description + "</div>");
			});

			$("#gameTitle").each(function(){
				$(this).html("<div class=\"animated fadeInDown\">" + gameKeys[index] + "</div>");
			});
			console.log(data.developer)
			console.log("success: GET game: " + gameName);
		},
		error: function(error){
			console.log("error:" + error);
		}
	});
}