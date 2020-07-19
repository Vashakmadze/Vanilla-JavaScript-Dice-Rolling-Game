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
let scores, roundScore, activePlayer, dice, gamePlaying;  // ზოგადი ცვლადები
const query = document.querySelector; // ქუერი სელექტორები
const getID = document.getElementById; // იდ სელექტორები

// ივენთები
document.querySelector('.btn-roll').addEventListener('click', btn) // კლიკ ივენთი
document.querySelector('.btn-hold').addEventListener('click', btnHold) // კლიკ ივენთი
document.querySelector('.btn-new').addEventListener('click', clickFunction) // კლიკ ივენთი

init(); // ფუნქციის გამოძახება სათავეში

function init(){
    activePlayer = 0; // 0 ით და 1 ით ვცვლით აქტიურ მოთამაშეს
    scores = [0,0]; // საწყისი გლობალური ქულები
    roundScore = 0; // საწყისი რაუნდის ქულები
    gamePlaying = true; // გეიმფლეის ბულეანი
    
    document.querySelector('.dice').style.display = 'none'; // ამით ვმალავთ კამათლის ფოტოს თამაშის დასაწყისში
    document.querySelector('score-0').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    document.querySelector('score-1').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    document.querySelector('current-0').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    document.querySelector('current-1').textContent = '0'; // ინტერფეისის 0 ზე დაყენება
    document.querySelector('#name-0').textContent = 'Player 1'; // ინტერფეისში სახელის შეცვლა
    document.querySelector('#name-1').textContent = 'Player 2'; // ინტერფეისში სახელის შეცვლა
    document.querySelector('.player-0-panel').classList.remove('winner'); // winner კლასის წაშლა
    document.querySelector('.player-1-panel').classList.remove('winner'); // winner კლასის წაშლა
    document.querySelector('.player-1-panel').classList.remove('active'); // active კლასის წაშლა
    document.querySelector('.player-0-panel').classList.remove('active'); // active კლასის წაშლა
    document.querySelector('.player-1-panel').classList.add('active'); // active კლასის დამატება

}

function clickFunction() {

    init(); // ინიტ ფუნქციის გამოძახება

}


function btn(){

    if (gamePlaying) {

        dice = Math.floor(Math.random() * 6) + 1; // რანდომული რიცხვი

        const diceDom = document.querySelector('.dice'); // ცვალიდის შექმნა რომ გავამარტივოთ კოდი
        diceDom.style.display = 'block'; // გაქრობა
        diceDom.src = 'dice-' + dice + '.png'; // ფოტოს შეცვლა
    
        if (dice !== 1) {
    
            roundScore += dice; // += იგივეა რაც  roundscore = roundscore + dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore; // მანიპულირებას ვახდენთ და ვსვამთ ტექსტს დინამიურად
    
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
        
    document.querySelector('current-0').textContent = '0'; // ინტერფეისში რესტარტდება ქულა
    document.querySelector('current-1').textContent = '0'; // ინტერფეისში რესტარტდება ქულა

    document.querySelector('.player-0-panel').classList.toggle('active'); // აქტიური მოთამაშის თაგლი
    document.querySelector('.player-1-panel').classList.toggle('active'); // აქტიური მოთამაშის თაგლი

    document.querySelector('.dice').style.display = 'none'; // მოთამაშის ცვლილების დროს მალავს კამათელს
}

function btnHold() {

    if (gamePlaying) {

        scores[activePlayer] += roundScore; // რაუნდის ქულის გლობალურ ქულაში დამატება
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; // ინტერფეისში დამატება ქულის
    
        if (scores[activePlayer] >= 100) {
    
            document.querySelector('#name-' + activePlayer).textContent = 'Winner:'; // ვინც მოიგებს გამოსახავს მოგებულს
            document.querySelector('.dice').style.display = 'none'; // ფოტოს წაშლა
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); // winner კლასის დამატება
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // active კლასის წაშლა
            gamePlaying = false;
    
        } else {   
    
            nextPlayer(); // ზემოთ შექმნილი ფუნქციის გამოძახება
    
    }
    
        nextPlayer(); // ზემოთ შექმნილი ფუნქციის გამოძახება
    
    }

}

// ალტერნატიული კოდი

// document.querySelector('#current-' + activePlayer).textContent = dice; // მანიპულირებას ვახდენთ და ვსვამთ ტექსტს დინამიურად
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; // ესეც შეიძლება გაკეთება
