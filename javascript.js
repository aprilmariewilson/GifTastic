var topics = ["John Wayne", "Marilyn Monroe", "Danny DeVito", "Chuck Norris", "Jennifer Lawrence", "Betty White", "Christopher Walken"];
var addButton = '';
var celebrity = '';
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=lz2q06u2dqQH3ledvz5cxyty0LvjlaKA&limit=10";
var celebrity = $("#newCelebrity").val();
$(document).ready(function () {
	// create buttons on page
	function renderButtons() {
		$("#celebrityButtons").empty();

		for (var i = 0; i < topics.length; i++) {
			addButton = $("<button>");
			addButton.addClass('celebrity');
			addButton.attr('data-name', topics[i]);
			addButton.text(topics[i]);
			$("#celebrityButtons").append(addButton);

		}
	}
	// add a new button on page
	$("#add-celeb").on('click', function (event) {
		event.preventDefault();
		celebrity = $("#newCelebrity").val();
		topics.push(celebrity);
		console.log(topics);
		renderButtons();
	});
	renderButtons();//show buttons

	// call api to page
	$("#celebrityButtons").on('click', function(event){

		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			console.log(response);
			var results = response.data;
			$('#celebrity-view').html(response);
			for (var i = 0; i < results.length; i++) {
				if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
	
					var gifDiv = $("<div class='item'>");
					var rating = results[i].rating;
					var p = $("<p>").text("Rating: " + rating);
					var personImage = $("<img>");
					personImage.attr("src", results[i].images.fixed_height.url);
					gifDiv.append(p);
					gifDiv.append(personImage);
				}
			}
		});
	});

	// create animate function
	$(".gif").on("click", function () {
		var state = $(this).attr("data-state");
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});
});





