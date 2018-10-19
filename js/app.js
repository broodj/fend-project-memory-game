/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond','fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-bomb', 'fa-bomb',
             'fa-leaf', 'fa-leaf',
             'fa-bolt', 'fa-bolt',
             'fa-square', 'fa-square',
             'fa-bicycle', 'fa-bicycle',
             'fa-anchor', 'fa-anchor'
            ]

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGame(){
    resetCards();
    resetMoves();

    var deck = document.querySelector('.deck');
    var cardHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
}

initGame();

//programatically create a card
function generateCard(card){
    return `<li class='card'><i class='fa ${card}'></i></li>`;
}


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



const deck = document.querySelector('.deck');
let openCards = [];
let matched = 0;
let moves = 0;
const FINAL_PAIRS = 8;
let movesText = document.querySelector('.moves');

deck.addEventListener('click', function(event){
    let target = event.target;

    if (isClickValid(target)){
        //startTimer();
    }
    toggleCard(target);
});

//check if a card can be clicked
function isClickValid(target){
    //evaluate:
    return (
        //target has a class of card AND 
        target.classList.contains('card') &&
        //target does NOT have class of match AND
        !target.classList.contains('match') &&
        //openCards contains less than 2 items AND
        openCards.length < 2 && 
        //flippedCards does NOT contain current target
        !openCards.includes(target)
    )
}

//show the card
function toggleCard(target){
    target.classList.toggle('open');
    target.classList.toggle('show');
    pushToArray(target);
    compareCards();
}

//check for match
function compareCards(){
//if openCards has exactly 2 items
    if(openCards.length === 2){
        // add 1 to move Counter
        //addMoves();
        //check star rating
        //checkMoves();
        //if the first element of cardOne is EXACTLY the same as cardTwo
        if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
            //toggle match for cardOne
            openCards[0].classList.toggle('match');
            //toggle match for cardTwo
            openCards[1].classList.toggle('match');
            //clear openCards
            clearArray();
            //total matched = n+1
            matched++
            //check for win condition
            if (matched === FINAL_PAIRS){
                gameOver();
            }
            console.log('match');
        } else {
            setTimeout(function(event){
                toggleCard(openCards[0]);
                toggleCard(openCards[1]);
                clearArray();
            }, 1000)
        }   
    }
}

//gameOver function
function gameOver(){
    toggleModal();
    resetCards();
    resetMoves();
}

//reset classes of cards back to just card
function resetCards(){
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards){
        card.className = 'card';
    }
}

//toggle display of congratulations modal
function toggleModal(){
    let modal = document.querySelector('.modalBackground');
    modal.classList.toggle('hide');
}

function resetMoves(){
    let moveCounter = document.querySelector('.moves');
    moveCounter.innerText = 0;
}

//push to array
function pushToArray(event){
    openCards.push(event);
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
