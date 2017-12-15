$(document).ready(initializeApp);

function initializeApp(){



    $("#game-area").on("click", ".card", flipCard);
    $("#game-area").on("click", ".card", card_clicked);



    createCards(randomArray);
    blur();



}

var images=["images/Blower.jpg",
            "images/BluePikCard.jpg",
            "images/Bulborb.jpg",
            "images/LouieCard.jpg",
            "images/Olimar.jpg",
            "images/PurplePikCard.jpg",
            "images/RedPikCard.jpg",
            "images/WhitePikCard.jpg",
            "images/YellowPikCard.jpg"];

//generate random images array from images array
function randomizeCards(images){
    var newArray= images.concat(images);
    var currentIndex = newArray.length;
    var temp;
    var randomIndex;
    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random()* currentIndex);
        currentIndex -= 1;
        temp = newArray[currentIndex];
        newArray[currentIndex]= newArray[randomIndex];
        newArray[randomIndex] = temp;
    }
    return newArray;

}

//dom creation of cards
function createCards(arr){
    for(var i = 0; i < arr.length; i++) {
        var wholeCard = $('<div>').addClass("card");
        var backImg = $('<img>').addClass("back").attr("src", "images/PikminCardBack.png");
        var frontImg = $("<img>").addClass("front").attr("src", arr[i]);
        wholeCard.append(frontImg);
        wholeCard.append(backImg);
        $("#game-area").append(wholeCard);

    }


}

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_src;
var second_card_src;
var total_possible_matches = 9;
var match_counter = 0;

var attempts=0;
var accuracy=0;
var games_played=0;

var randomArray = randomizeCards(images);


//display stats
function display_stats(){
    $(".games-played.value").text(games_played);
    $(".attempts.value").text(attempts);
    accuracy = ((match_counter/attempts)*100).toFixed(0);
    $(".accuracy.value").text(accuracy + "%");

}

//reset stats
function reset_stats(){
    attempts = 0;
    accuracy = 0;
    games_played = 0;
    display_stats();
}




//Process logic when card is clicked
function card_clicked(){
    if($(this).hasClass('noClick')){
        return;
    }

    if(first_card_clicked===null){
        first_card_clicked = this;
        first_card_src = $(this).find(".front").attr("src");


        $(first_card_clicked).addClass("noClick");
        return;
    }
    else{
        second_card_clicked=this;
        second_card_src= $(this).find(".front").attr("src");
        $(second_card_clicked).addClass("noClick");

        $("#game-area").off("click");


        if(first_card_src===second_card_src){
            match_counter++;




            first_card_clicked = null;
            second_card_clicked = null;
            $("#game-area").on("click", ".card", flipCard);
            $("#game-area").on("click", ".card", card_clicked);
            if(match_counter===total_possible_matches){
                setTimeout(user_has_won, 1500);
                setTimeout(function(){
                    $(".card").removeClass("flipped");
                }, 1200);
            }
            else{
                return;
            }

        }
        else{
            setTimeout(mismatch, 1300);
            return;


        }

    }
}
//When the user wins
function user_has_won(){
    games_played++;
    display_stats();
    $(".card").remove();
    randomArray = randomizeCards(images);
    createCards(randomArray);
    blur();

}

//For when 2 cards do not match
function mismatch(){
    $(first_card_clicked).toggleClass("flipped");
    $(second_card_clicked).toggleClass("flipped");
    $(first_card_clicked).removeClass("noClick");
    $(second_card_clicked).removeClass("noClick");
    $("#game-area").on("click", ".card", flipCard);
    $("#game-area").on("click", ".card", card_clicked);

    first_card_clicked =null;
    second_card_clicked=null;

}


///flip the card

function flipCard(){

    $(this).not($(".noClick")).toggleClass("flipped");
}

//Code here applies mousenter event to cards on enter and leave(blur and sizing)
function blur() {
    var cards = $('.card');
    cards.on('mouseenter', function () {
        var card = $(this);
        cards.not(card).removeClass('active').addClass('blur');
        card.removeClass('blur').addClass('active');

    });
    cards.on('mouseleave', function () {
        cards.removeClass('active blur');
    });
}




