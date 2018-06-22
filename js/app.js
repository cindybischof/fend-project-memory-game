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
function generateCards(card) {
    return `<li class="card"><i class="fa ${card}"></i></li>`;
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
function initiateGame() {
  var cardHTML = cards.map(function(card) {
    return generateCards(card);
  });
  console.log(cardHTML);
}

//initiateGame();

 //variable hold all cards
 var allCards = document.querySelectorAll('.card');
 //Array to hold cards that are open. Initially empty.
 var openCards = [];

 //event listner for clicks on cards
 allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
    //disables ability to click on a matched card or the same card twice
     if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
         //when a card is clicked, the card gets added to the openCards array
         openCards.push(card);
         //adds .open and .show classes when card is clicked
         card.classList.add('open', 'show');
         console.log('Open Cards:', openCards.length);
         //if 2 or more cards are showing, hide the cards again
         if (openCards.length == 2) {
           setTimeout(function() {
             openCards.forEach(function(card) {
               card.classList.remove('open', 'show');
             });

             openCards = [];
           }, 1000);
         }
     }
   });
 });
