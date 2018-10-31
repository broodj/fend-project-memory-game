//Game tiles
let cards = ['fa-diamond','fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-bomb', 'fa-bomb',
             'fa-leaf', 'fa-leaf',
             'fa-bolt', 'fa-bolt',
             'fa-square', 'fa-square',
             'fa-bicycle', 'fa-bicycle',
             'fa-anchor', 'fa-anchor'
            ]

//game variables
const FINAL_PAIRS = 8;
const deck = document.querySelector('.deck');
let openCards = [];
let matched = 0;
let moves = 0;
let timerOn = false;
let seconds = 0, minutes = 0;
let clock = document.querySelector('.clock');
let modalClose = document.querySelector('.modalClose');
let moveCounter = document.querySelector('.moves');
let stars = document.querySelectorAll('.fa-star');

function initGame(){
    resetCards();
    resetStars();
    resetMoves();
    resetTimer();
    shuffleAndDisplay();  
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

function shuffleAndDisplay(){
    let cardHTML = shuffle(cards).map(function(card){
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
}

deck.addEventListener('click', function(event){
    let target = event.target;

    if (openCards.length <= 1){

        if (isClickValid(target)){
            if (!timerOn){
                timerOn = true;
                startTimer();
            }

            toggleCard(target);
            pushToArray(target);
            compareCards();
        }
    }
});

function timer(){
    seconds++
    if (seconds < 10){
        clock.innerHTML = "0" + minutes + ':0' + seconds;
    } else {
        clock.innerHTML = "0" + minutes + ':' + seconds;
    }

    if (seconds == 60){
        seconds = 0;
        minutes++;
        clock.innerHTML = "0" + minutes + ":" + seconds;
    }
}

function startTimer(){
    t = setInterval(timer, 1000);
}

function endTimer(){
    clearInterval(t);
    seconds = 0;
    minutes = 0;
    timerOn = false;
}

function resetTimer(){
    let clock = document.querySelector('.clock');
    clock.innerHTML = '00:00';
}

function starCheck(){
    stars.forEach(function(star){
        if (moves >= 10){
            stars[0].classList.add('hide');
        }

        if (moves >= 20){
            stars[1].classList.add('hide');
        }
    });
}

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
}

//check for match
function compareCards(){
//if openCards has exactly 2 items
    if(openCards.length === 2){
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
        } else {
            openCards[0].classList.toggle('noMatch');
            openCards[1].classList.toggle('noMatch');
            setTimeout(function(event){
                toggleCard(openCards[0]);
                toggleCard(openCards[1]);
                openCards[0].classList.toggle('noMatch');
                openCards[1].classList.toggle('noMatch');
                clearArray();
            }, 1000)
        } 
        addMove();
        starCheck();  
    }
}

function populateModal(){
    let timeCount = document.querySelector('.modalTime');
    let movesCount = document.querySelector('.modalMoves');
    let starCount = document.querySelector('.modalStars');

    if (moves <= 9){
        starCount.innerHTML = `Star Rating: <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    }
    if (moves <= 20){
        starCount.innerHTML = `Star Rating: <i class="fa fa-star"></i><i class="fa fa-star"></i>`;
    }
    if (moves >= 21){
        starCount.innerHTML = `Star Rating: <i class="fa fa-star">`;
    }

    movesCount.innerHTML = 'Moves taken: ' + moves;
    timeCount.innerHTML = 'Time: ' + minutes + ':' + seconds;
}

//gameOver function
function gameOver(){
    populateModal();
    toggleModal();
    resetCards();
    endTimer(t);
    resetTimer();
}

//reset classes of cards back to just card
function resetCards(){
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards){
        card.className = 'card';
    }
}

function resetStars(){
    stars[0].classList.remove('hide');
    stars[1].classList.remove('hide');
    stars[2].classList.remove('hide');
}

//toggle display of congratulations modal
function toggleModal(){
    let modal = document.querySelector('.modalBackground');
    modal.classList.toggle('hide');
}

modalClose.addEventListener('click',function(){
    toggleModal();
})

let modalRetry = document.querySelector('.modalRestart');
modalRetry.addEventListener('click', function(){
    toggleModal();
    initGame();
})

let restart = document.querySelector('.restart');

restart.addEventListener('click', function(){
    endTimer();
    initGame();

})

function resetMoves(){
    moves = 0;
    moveCounter.innerHTML = moves;
}

function addMove(){
    moves++;
    moveCounter.innerHTML = moves;
}

//push to array
function pushToArray(event){
    openCards.push(event);
}

function clearArray(){
    openCards = [];
}

/** TO DO
 * Reset stars when new game begins
 * Last move animation before game over (?)
 * 
 * 
 */
