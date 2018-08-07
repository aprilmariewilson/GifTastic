var topics = ["John Wayne", "Marilyn Monroe", "Danny DeVito", "Chuck Norris", "Jennifer Lawrence", "Betty White", "Christopher Walken"];
var addButton;
var celebrity;
var celebButtons = $('#celebrityButtons');
var view = $('#celebrity-view');

var celebrity = $("#newCelebrity").val();
var state = $(this).attr("data-state");
$(document).ready(function () {
	// create buttons on page
	function renderButtons() {
		celebButtons.empty();


		for (var i = 0; i < topics.length; i++) {
			addButton = $("<button>");
			addButton.addClass("celebrity-button")
			addButton.attr('data-name', topics[i]);
			addButton.removeClass('btn-success').addClass('btn-primary');
			$(this).addClass('btn-fancy').removeClass('btn-primary');
			addButton.text(topics[i]);
			celebButtons.append(addButton);

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
	getGifs();

	// call api to page
	function getGifs(){
		$(document).on('click',".celebrity-button", function (e) {
		$('#celebrity-view').empty();
			var currentCeleb = $(this).attr('data-name');
			console.log(e);
			console.log(this)
			console.log(currentCeleb);
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentCeleb + "&api_key=lz2q06u2dqQH3ledvz5cxyty0LvjlaKA&limit=10";

			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function (response) {

				var results = response.data;
				for (var i = 0; i < results.length; i++) {
					if (results[i].rating !== "r" && results[i].rating !== "pg-13") 

						var rating = results[i].rating;
						var p = $("<p>").text("Rating: " + rating);
						var img = $("<img>");
						var src = results[i].images.fixed_height.url;
						var srcStill = results[i].images.fixed_height_still.url;

						img
						.addClass("imgClass")
						.attr("srcStill", srcStill)
						.attr("srcMoving", src)
						.attr("motion", "still")
						.attr("src", srcStill);

					
					
					view.append(img);
					view.append(p);

					
				}
			});
		});
	}



	// create animate function
	$("body").on("click",'img', function () {
		var motion =  $(this).attr("motion");
		console.log(motion);
	
	if (motion === "still"){
		$(this).attr("motion", "moving")
		.attr("src", ($(this).attr('srcmoving')));
	}else {
		$(this).attr("motion", "still");
		$(this).attr("src", ($(this).attr('srcstill')))
		}
	});
});





