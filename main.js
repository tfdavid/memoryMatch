$(document).ready(initializeApp);

function initializeApp(){



    $("#game-area").on("click", ".card", flipCard);
    $("#game-area").on("click", ".card", card_clicked);
    $(".reset").on("click", reset);
    $(".titleTitle").on("click", titleClick);



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

var matchesMade=0;
var attempts=0;
var accuracy=0;
var games_played=0;

var randomArray = randomizeCards(images);


//display stats
function display_stats(){
    $(".GamesPlayed .value").text(games_played);
    $(".attempts .value").text(attempts);
    if(attempts===0){
        $(".accuracy .value").text("0%");
    }
    else {
        accuracy = ((matchesMade / attempts) * 100).toFixed(0);
        $(".accuracy .value").text(accuracy + "%");
    }


}

//reset stats
function reset_stats(){
    attempts = 0;
    accuracy = 0;
    matchesMade=0;
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
        attempts++;
        display_stats();

        if(first_card_src===second_card_src){
            matchAudio(second_card_src);

            match_counter++;
            matchesMade++;
            display_stats();




            first_card_clicked = null;
            second_card_clicked = null;
            $("#game-area").on("click", ".card", flipCard);
            $("#game-area").on("click", ".card", card_clicked);
            if(match_counter===total_possible_matches){
                match_counter=0;
                GameWinWhistle.play();
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

//reset button
function reset(){
    match_counter=0;
    games_played++;
    reset_stats();
    display_stats();
    setTimeout(function(){
        $(".card").removeClass("flipped");
    }, 200);
    setTimeout((function(){
        $(".card").remove();
        randomArray = randomizeCards(images);
        createCards(randomArray);
        blur();
    }), 500)
    first_card_clicked=null;
    second_card_clicked=null;





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
    popAudio.play();
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

//title page click handler


function titleClick(){
    $(".titlePage").addClass("FadeOut");
    $(".PageContainer").addClass("FadeIn");
    titleAudio.pause();
    // mainAudio.play();
    mainAudio.loop = true;
}

//audio controls
var popAudio = new Audio("Sounds/Pop.wav");
var mainAudio = new Audio("Sounds/MainScreen.mp3");
mainAudio.volume=.5;

var LouieMatch = new Audio("Sounds/LouieMatch.ogg");
var OlimarMatch = new Audio("Sounds/OlimarMatch.ogg");
var GameWinWhistle = new Audio("Sounds/GameWinWhistle.ogg");
var BlowerMatch = new Audio("Sounds/BlowerMatch.mp3");
BlowerMatch.volume = .9;
var BulborbMatch = new Audio("Sounds/BulborbMatch.mp3");
BulborbMatch.volume = .9;
var PikminCardMatch = new Audio("Sounds/PikminCardMatch.mp3");
PikminCardMatch.volume = .4;

var titleAudio = new Audio("Sounds/TitleScreen.mp3");
titleAudio.play();
titleAudio.volume=.7;



//play audio on match

function matchAudio(src){

    switch(src) {
        case "images/LouieCard.jpg":
            console.log("louie");
            LouieMatch.load();   //had to reload this each time or failure
            LouieMatch.play();

            break;
        case "images/Olimar.jpg":
            OlimarMatch.play();
            break;
        case "images/Bulborb.jpg":
            BulborbMatch.play();
            break;
        case "images/Blower.jpg":
            BlowerMatch.play();
            break;
        default:
            PikminCardMatch.load();
            PikminCardMatch.play();
    }
};


