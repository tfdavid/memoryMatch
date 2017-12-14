$(document).ready(initializeApp);

function initializeApp(){



    $("#game-area").on("click", ".card", flipCard);
    $("#game-area").on("click", ".card", card_clicked);


    var container	= $('#game-area');


    var cards = $('.card');




    cards.on( 'mouseenter', function() {


        var card= $(this);

        cards.not(card).removeClass('active').addClass('blur');

        card.removeClass('blur').addClass('active');

    });
    cards.on( 'mouseleave', function() {
        if($(this).data('clicked')){
            console.log("YES");

        };

        cards.removeClass('active blur');

    });


}

var first_card_clicked = null;
var second_card_clicked = null;
var first_card_src;
var second_card_src;
var total_possible_matches = 9;
var match_counter = 0;



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
                user_has_won();
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

function user_has_won(){
    console.log("YOU WON");
}

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


