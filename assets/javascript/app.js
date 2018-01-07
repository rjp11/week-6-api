var topics = [
    "puppy",
    "kitten",
    "wombat",
    "panda",
    "whale",
    "penguin",
    "giraffe",
    "koala",
    "polar bear",
    "kangaroo",
    "elephant",
    "anteater",
    "squirrel",
    "sea horse",
    "flamingo",
    "owl"
];
var resultCount = 0;

// when topic button is clicked, access gifs from the giphy API
$(document).on("click", "button", function () {
    resultCount = 0;
    var search = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=2ugOg43c7IZZlqgRomBrJvC8kYMndHB5";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {
            var results = response.data;
            // empty the gif div to replace the images with the new query
            $(".gifs").empty();
            for (var j = 0; j < results.length; j++) {
                // limit displayed gifs to 10. 
                if (resultCount < 10) {
                    // only display gifs if more family friendly than pg 13
                    if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                        var gifDiv = $("<div class='item'>");
                        var rating = results[j].rating;
                        var p = $("<h4>").text("Rating: " + rating);
                        var gifImage = $("<img>");
                        // apply attribute for source of still image url
                        gifImage.attr("data-still", results[j].images.fixed_height_still.url)
                        // apply attribute for source of animated gif
                        // fixed height chosen so results display cleanly together
                        gifImage.attr("data-gif", results[j].images.fixed_height.url);
                        // attribute in order to switch between still and animated
                        gifImage.attr("data-status", 0);
                        // set initial source to still image
                        gifImage.attr("src", results[j].images.fixed_height_still.url);
                        //add gif and text to div and append to DOM
                        gifDiv.append(gifImage);
                        gifDiv.append(p);
                        $(".gifs").prepend(gifDiv);
                        // increase result count to limit to 10 results
                        resultCount++;
                    };
                };
            };
        });
});

// event handler to switch gif source between still and animated on click
$(document).on("click", "img", function () {
    //if still change image to animated
    if ($(this).attr("data-status") === "0") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-status", 1);
    } 
    // else change image from animated to still
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-status", 0);
    };
});

// function to render the buttons to the DOM from the topics array
function renderButtons() {
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append("<button class='btn-default btn-lg'>" + topics[i] + "</button>");
    };
};

// event handler to add a new topic/button to the possible Giphy API search options
$("#add-topic").on("click", function (event) {
    var newTopic = $("#topic-input").val().trim();
    // prevent duplicate buttons by checking the index of the form
    if (topics.indexOf(newTopic) === -1) {
        event.preventDefault();
        topics.push(newTopic);
        renderButtons();
        // reset form input to zero after adding button
        $("#topic-input").val('');
    } else {
        event.preventDefault();
        // reset form input to blank after entering a duplicate
        $("#topic-input").val('');
    };
});

// on page load, render default topic buttons to the DOM.
renderButtons();