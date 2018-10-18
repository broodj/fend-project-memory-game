/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//grab all cards
let allCards = document.querySelectorAll('.card');
let openCards = [];

allCards.forEach(function(card){
    card.addEventListener('click', function(){
        showCard(card);
        pushToArray(card);
        
        
        changeCard(card);


        clearArray();
        console.log(openCards);
    });

    
});

//setTimeout(function(){

//}, 1000);


//if (openCards[0].type === openCards[1].type){

//}

//show the card
function showCard(event){
    event.classList.add('open','show','disabled');
}

//hide the card
function hideCard(event){
    event.classList.remove('open','show','disabled');
}

//flip after timeout
function changeCard(card) {
    setTimeout(function() {
      hideCard(card);
    }, 1000); 
}

//push to array
function pushToArray(event){
    openCards.push(event);
}

//check for match
function checkMatch(){
    //to do
}

//change card to match background
function makeMatch(event){
    //to do
}

function clearArray(){
    openCards = [];
}


//
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
