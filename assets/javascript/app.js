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
            $(".gifs").empty();
            for (var j = 0; j < results.length; j++) {
                if (resultCount < 10) {
                    if (results[j].rating !== "r" && results[j].rating !== "pg-13") {
                        var gifDiv = $("<div class='item'>");
                        var rating = results[j].rating;
                        var p = $("<h4>").text("Rating: " + rating);
                        var gifImage = $("<img>");
                        gifImage.attr("data-still", results[j].images.fixed_height_still.url)
                        gifImage.attr("data-gif", results[j].images.fixed_height.url);
                        gifImage.attr("data-status", 0);
                        gifImage.attr("src", results[j].images.fixed_height_still.url);
                        gifDiv.append(gifImage);
                        gifDiv.append(p);
                        $(".gifs").prepend(gifDiv);
                        resultCount++;
                    };
                };
            };
        });
});

$(document).on("click", "img", function () {
    if ($(this).attr("data-status") === "0") {
        $(this).attr("src", $(this).attr("data-gif"));
        $(this).attr("data-status", 1);
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-status", 0);
    };
});

function renderButtons() {
    $(".buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        $(".buttons").append("<button class='btn-default btn-lg'>" + topics[i] + "</button>");
    };
};



$("#add-topic").on("click", function (event) {
    var newTopic = $("#topic-input").val().trim();
    if (topics.indexOf(newTopic) === -1) {
        event.preventDefault();
        topics.push(newTopic);
        console.log(topics);
        renderButtons();
        $("#topic-input").val('');
    } else {
        event.preventDefault();
        $("#topic-input").val('');
    };
});

renderButtons();