var index = 3;
var gameKeys = [];

window.onload = function() {
  Particles.init({
    selector: '.background',
    color: '#ffffff',
    maxParticles: '750'
  });
};

$("#infoBtn").click(function(){
	$("#overlayContainer").toggleClass("overlayVisible");
});

$("#closeOverlayBtn").click(function(){
	$("#overlayContainer").toggleClass("overlayVisible");
});

$("#rightNav").click(function(){
	index = (index + 1) % gameKeys.length;
	fetchNextGame(gameKeys[index]);
	fetchNextVideoLocal(gameKeys[index]);
});

$("#leftNav").click(function(){
	index = (index - 1);
	if (index < 0){
		index = gameKeys.length - 1;
	}
	fetchNextGame(gameKeys[Math.abs(index)]);
	fetchNextVideoLocal(gameKeys[Math.abs(index)]);
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
		},
		error: function(error){
			console.log("error: " +error);
		}
	});
});

function fetchNextVideoLocal(gameName){
	var trimmedStr = gameName.replace(/\s+/g, '');
	console.log("/" + trimmedStr + "-GET");
	$.ajax({
		url: "/" + trimmedStr + "-GET",
		type: "GET",
		success: function(data){
			console.log(data.url);
			$("#videoSrc").attr("src", data.url  + "?autoplay=1");
		},
		error: function(error){
			console.log(error);
		}
	});
}


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
		},
		error: function(error){
			console.log("error:" + error);
		}
	});
}