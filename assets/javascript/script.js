var arr = ["cats", "dogs"];

function displayGifs(){
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=ND5ruAbzX9ak0sfdIZ9AzngFf15mkIse&limit=10";
    console.log(animal)
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(queryURL)
        console.log(response)
        var results = response.data;

        for(var i = 0; i < results.length; i ++){
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

            var title = $("<p>");
            title.addClass("title")
            title.text("Title: " + results[i].title);

            animalDiv.html(animalGif);
            animalDiv.prepend(title);
            animalDiv.prepend(rating);
            
            $(".gifs").prepend(animalDiv);
        }
    }) 
};

function buttonRender(){
    $(".buttons").empty();
    
    for(var i=0; i < arr.length; i++){
        var newButton = $("<button>");
    newButton.attr("type", "button")
    newButton.addClass("button btn btn-default")
    newButton.attr("data-animal", arr[i])
    newButton.text(arr[i])

    $(".buttons").append(newButton)
    }
}


$(".submit").on("click", function(event){
    event.preventDefault();

    var input = $("#text-input").val().trim();

    arr.push(input)
    console.log(arr)

    // Clear the input area
    $("#text-input").val("");
    
    buttonRender();
})

$(document).on("click", ".button", displayGifs);

buttonRender();


//==================================
$(document).on("click", ".gif", function() {
    console.log("click")
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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
//===================================






