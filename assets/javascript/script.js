// Initial array of animals
var arr = ["cats", "dogs", "kittens", "puppies", "catdog"];

// Function for getting and rendering content
function displayGifs() {
    // clear .gifs div
    $(".gifs").empty();

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ND5ruAbzX9ak0sfdIZ9AzngFf15mkIse&limit=10";

    // AJAX call for the button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL)
        console.log(response)
        var results = response.data;

        // Looping through array of annimals 
        for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div>");
            animalDiv.addClass("gif-divs")

            var animalGif = $("<img>");
            animalGif.attr("src", results[i].images.fixed_height_still.url)
            animalGif.attr("alt", animal + [i])
            animalGif.attr("data-state", "still")
            animalGif.attr("data-still", results[i].images.fixed_height_still.url)
            animalGif.attr("data-animate", results[i].images.fixed_height.url)

            animalGif.addClass("gif")

            var rating = $("<p>");
            rating.text("Rating: " + results[i].rating);

            animalDiv.html(animalGif);
            animalDiv.prepend(rating);

            // Render animalDiv to the page
            $(".gifs").prepend(animalDiv);
        }
    })
};

function buttonRender() {
    // Deleting buttons prior to adding new ones
    $(".buttons").empty();

    // Looping through the array of annimal and creating buttons for them
    for (var i = 0; i < arr.length; i++) {
        var newButton = $("<button>");
        newButton.attr("type", "button")
        newButton.addClass("button btn btn-default")
        newButton.attr("data-animal", arr[i])
        newButton.text(arr[i])

        // Rendering buttons to the page
        $(".buttons").append(newButton)
    }
};

// Function for adding a button
function addButton() {
    // Grabs the input from the textbox
    var input = $("#text-input").val().trim();

    // Adding animals fron input to the array
    arr.push(input)
    console.log(arr)

    // Clear the input area
    $("#text-input").val("");

    // Renders buttons from the updated array 
    buttonRender();
};

// Handles events where a 'Go' button is clicked
$(".submit").on("click", function (event) {
    event.preventDefault();

    addButton();
});

$('#text-input').keypress(function (event) {
    if (event.keyCode === 13) {
        addButton();
    }
});

// Event listener for buttons
$(document).on("click", ".button", displayGifs);

// Event listener for gifs. Changes state forom static to animated and back
$(document).on("click", ".gif", function () {

    // Get the value of a "data-state" attribute of the image that is being clicked
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Displaying the intial buttons from initial array
buttonRender();