/*
 * Create a list that holds all of your cards
 * An array holds all of the cards
 */
var cards = ['fa-diamond', 'fa-diamond',
              'fa-paper-plane-o', 'fa-paper-plane-o',
              'fa-anchor', 'fa-anchor',
              'fa-bolt', 'fa-bolt',
              'fa-cube', 'fa-cube',
              'fa-leaf', 'fa-leaf',
              'fa-bicycle', 'fa-bicycle',
              'fa-bomb', 'fa-bomb'];

//template literal used in a function that generates the cards programatically
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

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

 //function to initiate the game
function initiateGame() {
  //stores the unorderd list with the class .deck from the HTML file, where we will put cards
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    //calls generateCard function for each card
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
  gameStopwatch();
}

initiateGame();

 //variable hold all cards
 var allCards = document.querySelectorAll('.card');
 //Array to hold cards that are open. Initially empty.
 var openCards = [];
//moves counter - begins at 0
 var moves = 0;
//selects the moves counter in index.html
 var movesCounter = document.querySelector('.moves');
//selects the restart game "fa-repeat" icon
 var restartGame = document.querySelector('.fa-repeat');
 //variable for timer to keep track of elapsed milliseconds
 let counter = 0;
 //selects minutes section of HTML stopwatch
 let displayMinutes = document.querySelector('.minutes');
 //selects seconds section of HTML stopwatch
 let displaySeconds = document.querySelector('.seconds');

 //game stopwatch function
 function gameStopwatch() {
    clearInterval(interval);
    var interval = setInterval(function() {
      counter++;
      var s = counter;
      convertSeconds(Math.floor(s));
    }, 1000);
 }

 function convertSeconds(s) {
   var minutes = Math.floor(((s % 864000) % 3600) / 60);
   var seconds = ((s % 86400) % 3600) % 60;
   displayMinutes.innerHTML = minutes;
   if(seconds < 10) {
      displaySeconds.innerHTML = "0" + seconds;
 } else {
      displaySeconds.innerHTML = seconds;
    }
 }

//event listener for restart game button
restartGame.addEventListener('click', function(e) {
  initiateGame();
  console.log('Reinitiate game');
});

//function to check how many moves have been made & change star rating
function starRating() {
  const three = document.querySelector('.three');
  const two = document.querySelector('.two');
  const one = document.querySelector('.one');
  if (moves === 10) {
    three.style.display = 'none';
    console.log('moves = 10');
  } else if (moves === 15) {
    two.style.display = 'none';
    console.log('moves = 15')
  } else if (moves === 20) {
    one.style.display = 'none';
    console.log('moves = 20')
  }
}

 //event listner for clicks on cards
 allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
    //disables ability to click on a matched card or the same card twice
     if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
         //when a card is clicked, the card gets added to the openCards array
         openCards.push(card);
         //adds .open and .show classes when card is clicked
         card.classList.add('open', 'show');

         //if 2 or more cards are showing, see if they are a match or not
         //since the array gets cleared out each time, there will only be 2 cards in the array at a time
         if (openCards.length == 2) {
           //if the cards match, add the .match, .open & .show classes
           if (openCards[0].dataset.card == openCards[1].dataset.card) {
               openCards[0].classList.add('match');
               openCards[0].classList.add('open');
               openCards[0].classList.add('show');

               openCards[1].classList.add('match');
               openCards[1].classList.add('open');
               openCards[1].classList.add('show');

               openCards = [];
           } else {
          //if it's not a match, hide the cards again
           setTimeout(function() {
             openCards.forEach(function(card) {
               card.classList.remove('open', 'show');
             });
             openCards = [];
           }, 1000);
         }
         moves += 1;
         movesCounter.innerText = moves;
       }
      starRating();
     }
   });
 });
