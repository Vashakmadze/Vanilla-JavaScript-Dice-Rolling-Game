/*
თამაშის წესები:

- თამაშს ყავს 2 მოთამაშე და ითამაშება რაუნდებით
- თითო რაუნდში მოთამაშე კამათელს აგორებს რამდენჯერაც უნდა. ყველა შედეგი ემატება რაუნდის ქულას
- მაგრამ, თუ მოთამაშე გააგორებს 1-იანს მისი რაუნდის ქულა იკარგება. ამის შემდეგ შემდეგი მოთამაშის ჯერია
- ორივე მოთამაშეს აქვს შესაძლებლობა დააჭიროს Hold ღილაკს, ამ ღილაკით მოთამაში თავის რაუნდის ქულას გადაიტან გლობალურ ქულაში ( რომელიც თამაშის დასრულებამდე დაგრჩებათ).
  ამის შემდეგ შემდეგი მოთამაშის ჯერი დგება.
- მოთამაშე რომელიც ავა 100 ქულამდე იგებს თამაშს.

*/

// ცვლადები
var scores, roundScore, activePlayer, dice, gamePlaying;  // ზოგადი ცვლადები
var query = document.querySelector; // ქუერი სელექტორები
var getID = document.getElementById; // იდ სელექტორები

// ივენთები
query('.btn-roll').addEventListener('click', btn) // კლიკ ივენთი
query('.btn-hold').addEventListener('click', btnHold) // კლიკ ივენთი
query('.btn-new').addEventListener('click', clickFunction) // კლიკ ივენთი

init(); // ფუნქციის გამოძახება სათავეში

function init(){
    activePlayer = 0; // 0 ით და 1 ით ვცვლით აქტიურ მოთამაშეს
    scores = [0,0]; // საწყისი გლობალური ქულები
    roundScore = 0; // საწყისი რაუნდის ქულები
    gamePlaying = true; // გეიმფლეის ბულეანი
    
    query('.dice').style.display = 'none'; // ამით ვმალავთ კამათლის ფოტოს თამაშის დასაწყისში
    getID('score-0').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    getID('score-1').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    getID('current-0').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    getID('current-1').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    query('#name-0').textContent = 'Player 1'; // ინტერფეისში სახელის შეცვლა
    query('#name-1').textContent = 'Player 2'; // ინტერფეისში სახელის შეცვლა
    query('.player-0-panel').classList.remove('winner'); // winner კლასის წაშლა
    query('.player-1-panel').classList.remove('winner'); // winner კლასის წაშლა
    query('.player-1-panel').classList.remove('active'); // active კლასის წაშლა
    query('.player-0-panel').classList.remove('active'); // active კლასის წაშლა
    query('.player-1-panel').classList.add('active'); // active კლასის დამატება

}



function btn(){

    if (gamePlaying) {

        dice = Math.floor(Math.random() * 6) + 1; // რანდომული რიცხვი

        var diceDom = query('.dice'); // ცვალიდის შექმნა რომ გავამარტივოთ კოდი
        diceDom.style.display = 'block'; // გაქრობა
        diceDom.src = 'dice-' + dice + '.png'; // ფოტოს შეცვლა
    
        if (dice !== 1) {
    
            roundScore += dice; // += იგივეა რაც  roundscore = roundscore + dice
            query('#current-' + activePlayer).textContent = roundScore; // მანიპულირებას ვახდენთ და ვსვამთ ტექსტს დინამიურად
    
        } else {
    
            nextPlayer(); // მაღლა შექმნილი ფუნქციის გამოძახება

    }
    /********************************8
    // ალტერნტიული კოდი
     */
        // document.querySelector('.player-0-panel').classList.remove('active'); // აქტიურ მოთამაშეს აჩვენებს კლასის მოხსნით
        // document.querySelector('.player-1-panel').classList.add('active'); // აქტიურ მოთამაშეს აჩვენებს კლასის დამატებით

    }

}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //შემდეგი მოთამაშე ternery operator-ით
    roundScore = 0; // რაუნდის ქულა რესტარტდება JS-ში
        
    getID('current-0').textContent = '0'; // ინტერფეისში რესტარტდება ქულა
    getID('current-1').textContent = '0'; // ინტერფეისში რესტარტდება ქულა

    query('.player-0-panel').classList.toggle('active'); // აქტიური მოთამაშის თაგლი
    query('.player-1-panel').classList.toggle('active'); // აქტიური მოთამაშის თაგლი

    query('.dice').style.display = 'none'; // მოთამაშის ცვლილების დროს მალავს კამათელს
}

function btnHold() {

    if (gamePlaying) {

        scores[activePlayer] += roundScore; // რაუნდის ქულის გლობალურ ქულაში დამატება
        query('#score-' + activePlayer).textContent = scores[activePlayer]; // ინტერფეისში დამატება ქულის
    
        if (scores[activePlayer] >= 100) {
    
            query('#name-' + activePlayer).textContent = 'Winner:'; // ვინც მოიგებს გამოსახავს მოგებულს
            query('.dice').style.display = 'none'; // ფოტოს წაშლა
            query('.player-' + activePlayer + '-panel').classList.add('winner'); // winner კლასის დამატება
            query('.player-' + activePlayer + '-panel').classList.remove('active'); // active კლასის წაშლა
            gamePlaying = false;
    
        } else {   
    
            nextPlayer(); // ზემოთ შექმნილი ფუნქციის გამოძახება
    
    }
    
        nextPlayer(); // ზემოთ შექმნილი ფუნქციის გამოძახება
    
    }

}

function clickFunction() {

    init(); // ინიტ ფუნქციის გამოძახება

}
// ალტერნატიული კოდი

// document.querySelector('#current-' + activePlayer).textContent = dice; // მანიპულირებას ვახდენთ და ვსვამთ ტექსტს დინამიურად
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // ესეც შეიძლება გაკეთება
